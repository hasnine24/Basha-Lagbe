import "dotenv/config";
import mongoose from "mongoose";
import connectDB from "./server/db.js";
import Property from "./model/Property.js";

const seedProperties = async () => {
  await connectDB();

  const locations = ["Gulshan, Dhaka", "Banani, Dhaka", "Dhanmondi, Dhaka", "Mirpur, Dhaka", "Uttara, Dhaka", "Mohammadpur, Dhaka", "Badda, Dhaka", "Malibag, Dhaka"];
  const propertyTypes = ["Apartment", "House", "Duplex"];
  const categories = ["Family", "Bachelor", "Office", "Sublet", "Hostel", "Shop"];
  const titles = ["Luxury Apartment", "Cozy Home", "Modern Duplex", "Spacious Flat", "Elegant House", "Comfortable Residence"];
  const randomImages = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1502672260266-1c1c2c10b7f8",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  ];

  const propertiesToInsert = [];

  for (let i = 0; i < 40; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)] + " " + (i + 1);
    const type = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 80000) + 15000;
    const area = Math.floor(Math.random() * 2000) + 800;
    const address = locations[Math.floor(Math.random() * locations.length)];
    const description = "A beautiful " + category + " property located in " + address + " with " + type + " style.";
    const bedrooms = Math.floor(Math.random() * 3) + 2;
    const bathrooms = Math.floor(Math.random() * 2) + 1;
    const balconies = Math.floor(Math.random() * 3);
    const includes = {
      gas: Math.random() > 0.5,
      water: Math.random() > 0.5,
      serviceCharge: Math.random() > 0.5,
    };
    const images = [randomImages[Math.floor(Math.random() * randomImages.length)]];
    const isBooked = Math.random() > 0.7; // 30% chance to be booked

    propertiesToInsert.push({
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
      isBooked,
    });
  }

  try {
    await Property.insertMany(propertiesToInsert);
    console.log(`Successfully added ${propertiesToInsert.length} properties!`);
  } catch (err) {
    console.error("Error inserting properties:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedProperties();
