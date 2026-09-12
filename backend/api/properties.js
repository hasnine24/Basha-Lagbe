import express from "express";
import Property from "../model/Property.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newProperty = new Property(req.body);
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

export default router;
