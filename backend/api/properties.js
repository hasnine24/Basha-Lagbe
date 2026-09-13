import express from "express";
import Property from "../model/Property.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();


const storage = multer.memoryStorage();
const upload = multer({ storage });



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


router.post("/uploadImages", checkToken, upload.array("images", 5), async (req, res) => {
  try {
    const urls = [];
    
    
    for (const file of req.files) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "basha-lagbe" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
      urls.push(uploadResult.secure_url);
    }
    
    res.json({ urls });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ message: "Failed to upload images" });
  }
});


router.post("/", checkToken, async (req, res) => {
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


router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch property", error: error.message });
  }
});


router.put("/:id", checkToken, async (req, res) => {
  try {
    
    
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({
      message: "Property updated successfully!",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({
      message: "Failed to update property",
      error: error.message,
    });
  }
});


router.delete("/:id", checkToken, async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({ message: "Property deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property", error: error.message });
  }
});

export default router;
