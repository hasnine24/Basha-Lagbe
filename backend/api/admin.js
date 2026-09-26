import express from "express";
import User from "../model/User.js";
import Property from "../model/Property.js";
import Request from "../model/Request.js";
import checkToken from "../middlewares/checkToken.js";
import allowRoles from "../middlewares/allowRoles.js";

const router = express.Router();

router.use(checkToken, allowRoles("admin"));

router.get("/stats", async (req, res) => {
  try {
    const [users, properties, requests] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      Request.countDocuments(),
    ]);

    res.json({ users, properties, requests });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const properties = await Property.find({ advertiser: req.params.id }).select("_id");
    const propertyIds = properties.map((property) => property._id);

    await Property.deleteMany({ advertiser: req.params.id });
    await Request.deleteMany({
      $or: [
        { seeker: req.params.id },
        { advertiser: req.params.id },
        { property: { $in: propertyIds } },
      ],
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

router.get("/properties", async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("advertiser", "name email phone")
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    console.error("Error fetching admin properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

router.delete("/properties/:id", async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }

    await Request.deleteMany({ property: req.params.id });
    res.json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin property:", error);
    res.status(500).json({ error: "Failed to delete property" });
  }
});

router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find()
      .populate("property", "title address")
      .populate("seeker", "name email phone")
      .populate("advertiser", "name email phone")
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching admin requests:", error);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

export default router;
