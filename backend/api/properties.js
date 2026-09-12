import express from "express";
import Property from "../model/Property.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/", checkToken, async (req, res) => {
  try {
    const { owner: _discard, ...propertyData } = req.body;
    const newProperty = new Property({
      ...propertyData,
      owner: req.user.id,
    });
    const savedProperty = await newProperty.save();

    console.log("Property added successfully!");

    res.status(201).json({
      message: "Property added successfully!",
      property: savedProperty,
    });
  } catch (error) {
    console.error("Error saving property:", error);
    res.status(500).json({
      message: "Failed to add property",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

router.get("/my-properties", checkToken, async (req, res) => {
  try {
    const properties = await Property.find({ owner: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(properties);
  } catch (error) {
    console.error("Error fetching user properties:", error);
    res.status(500).json({ message: "Failed to fetch user properties" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    console.error("Error fetching property by id:", error);
    res.status(500).json({ message: "Failed to fetch property", error: error.message });
  }
});

router.put("/:id", checkToken, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    const ownerId = property.owner?._id
      ? property.owner._id.toString()
      : property.owner?.toString();

    if (!ownerId || ownerId !== req.user.id.toString()) {
      return res.status(403).json({
        message: "Forbidden: You can only edit your own properties",
      });
    }

    const {
      title,
      type,
      price,
      area,
      address,
      description,
      bedrooms,
      bathrooms,
      balconies,
      includes,
      images,
    } = req.body;

    if (title !== undefined) property.title = title;
    if (type !== undefined) property.type = type;
    if (price !== undefined) property.price = Number(price);
    if (area !== undefined) property.area = Number(area);
    if (address !== undefined) property.address = address;
    if (description !== undefined) property.description = description;
    if (bedrooms !== undefined) property.bedrooms = Number(bedrooms);
    if (bathrooms !== undefined) property.bathrooms = Number(bathrooms);
    if (balconies !== undefined) property.balconies = Number(balconies);
    if (includes !== undefined) property.includes = includes;
    if (images !== undefined) property.images = images;

    const savedProperty = await property.save();

    res.status(200).json({
      message: "Property updated successfully!",
      property: savedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      message: "Failed to update property",
      error: error.message,
    });
  }
});

export default router;
