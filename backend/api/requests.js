import express from "express";
import Request from "../model/Request.js";
import Property from "../model/Property.js";
import User from "../model/User.js";
import checkToken from "../middlewares/checkToken.js";
import allowRoles from "../middlewares/allowRoles.js";

const router = express.Router();

// Create a new rental request (Seeker only)
router.post("/", checkToken, allowRoles("seeker"), async (req, res) => {
  try {
    const { propertyId, name, email, phone, message } = req.body;

    if (!propertyId || !name || !email) {
      return res.status(400).json({ error: "Property, name, and email are required" });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }

    // Check if user already submitted a pending or accepted request for this property
    const existingRequest = await Request.findOne({
      property: propertyId,
      seeker: req.user.id,
      status: { $in: ["pending", "accepted"] },
    });

    if (existingRequest) {
      return res.status(400).json({
        error: "You already have an active request for this property.",
      });
    }

    const newRequest = await Request.create({
      property: propertyId,
      seeker: req.user.id,
      advertiser: property.advertiser,
      renterName: name,
      email,
      phone: phone || "",
      message: message || "",
      status: "pending",
    });

    return res.status(201).json({
      message: "Request sent successfully",
      request: newRequest,
    });
  } catch (error) {
    console.error("Error creating request:", error);
    return res.status(500).json({ error: "Failed to send request", details: error.message });
  }
});

// Get requests based on user role (Seeker sees only their requests; Advertiser sees requests for their properties)
router.get("/", checkToken, async (req, res) => {
  try {
    if (req.user.role === "seeker") {
      const requests = await Request.find({ seeker: req.user.id })
        .populate("property")
        .populate("advertiser", "name email phone")
        .sort({ createdAt: -1 });

      return res.json(requests);
    } else if (req.user.role === "advertiser") {
      const requests = await Request.find({ advertiser: req.user.id })
        .populate("property")
        .populate("seeker", "name email phone")
        .sort({ createdAt: -1 });

      return res.json(requests);
    } else {
      return res.status(403).json({ error: "Access denied" });
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    return res.status(500).json({ error: "Failed to fetch requests", details: error.message });
  }
});

// Accept a request (Advertiser only)
router.patch("/:id/accept", checkToken, allowRoles("advertiser"), async (req, res) => {
  try {
    const request = await Request.findOne({
      _id: req.params.id,
      advertiser: req.user.id,
    });

    if (!request) {
      return res.status(404).json({ error: "Request not found or access denied" });
    }

    request.status = "accepted";
    await request.save();

    // Mark the property as accepted
    if (request.property) {
      await Property.findByIdAndUpdate(request.property, { isAccepted: true });
    }

    return res.json({
      message: "Request accepted successfully",
      request,
    });
  } catch (error) {
    console.error("Error accepting request:", error);
    return res.status(500).json({ error: "Failed to accept request", details: error.message });
  }
});

// Delete a request (Advertiser can delete requests sent to them; Seeker can delete requests made by them)
router.delete("/:id", checkToken, async (req, res) => {
  try {
    const query =
      req.user.role === "advertiser"
        ? { _id: req.params.id, advertiser: req.user.id }
        : { _id: req.params.id, seeker: req.user.id };

    const deletedRequest = await Request.findOneAndDelete(query);

    if (!deletedRequest) {
      return res.status(404).json({ error: "Request not found or access denied" });
    }

    // If deleted request was accepted, check if any other accepted requests exist for the property
    if (deletedRequest.status === "accepted" && deletedRequest.property) {
      const remainingAccepted = await Request.findOne({
        property: deletedRequest.property,
        status: "accepted",
      });

      if (!remainingAccepted) {
        await Property.findByIdAndUpdate(deletedRequest.property, { isAccepted: false });
      }
    }

    return res.json({ message: "Request deleted successfully" });
  } catch (error) {
    console.error("Error deleting request:", error);
    return res.status(500).json({ error: "Failed to delete request", details: error.message });
  }
});

export default router;
