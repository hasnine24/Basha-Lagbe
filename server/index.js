import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import log from "./middlewares/logger.js";
import authRouter from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = process.env.PORT || 5001;
const DATABASE_URL = process.env.DATABASE_URL || process.env.MONGO_URI;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ALLOWED_ORIGIN }));
app.use(log);

app.get("/api", (req, res) => {
  res.json({ message: "Basha Lagbe API is working" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);

const startServer = async () => {
  if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }

  await mongoose.connect(DATABASE_URL);
  console.log("Connected to database");
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
};

startServer().catch((error) => {
  console.error("Error connecting to database:", error.message);
  process.exit(1);
});
