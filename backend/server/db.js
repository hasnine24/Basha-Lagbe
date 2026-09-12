import mongoose from "mongoose";

const connectDB = async () => {
  const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGO_URI;
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};

export default connectDB;
