import express from "express";
import Property from "../model/Property.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import checkToken from "../middlewares/checkToken.js";
import allowRoles from "../middlewares/allowRoles.js";

const router = express.Router();


import fs from "fs";
import os from "os";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, os.tmpdir());
  }
});
const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post(
  "/uploadImages",
  checkToken,
  allowRoles("advertiser"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const urls = [];
      
      for (const file of req.files) {
        try {
          const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: "basha-lagbe",
          });
          urls.push(uploadResult.secure_url);
        } finally {
          // Always delete the temporary file from disk to save space
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      }
      
      res.json({ urls });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ message: "Failed to upload images" });
    }
  }
);


router.post("/", checkToken, allowRoles("advertiser"), async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      advertiser: req.user.id,
    };
    const newProperty = new Property(propertyData);
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
    const properties = await Property.find()
      .populate("advertiser", "name email phone")
      .sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});


router.get("/my-properties", checkToken, allowRoles("advertiser"), async (req, res) => {
  try {
    const properties = await Property.find({ advertiser: req.user.id }).sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your properties", error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate("advertiser", "name email phone");
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch property", error: error.message });
  }
});


router.put("/:id", checkToken, allowRoles("advertiser"), async (req, res) => {
  try {
    const updatedProperty = await Property.findOneAndUpdate(
      { _id: req.params.id, advertiser: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found or you do not have permission to edit it" });
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


router.delete("/:id", checkToken, allowRoles("advertiser"), async (req, res) => {
  try {
    const deletedProperty = await Property.findOneAndDelete({
      _id: req.params.id,
      advertiser: req.user.id,
    });
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found or you do not have permission to delete it" });
    }
    res.json({ message: "Property deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete property", error: error.message });
  }
});

export default router;
