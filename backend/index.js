import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./server/db.js";
import authRouter from "./api/auth.js";
import userRoutes from "./api/users.js";
import propertiesRouter from "./api/properties.js";

const app = express();
const PORT = process.env.PORT || 5001;
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: ALLOWED_ORIGIN }));

app.get("/api", (req, res) => {
  res.json({ message: "Basha Lagbe API is working" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRouter);
app.use("/api/properties", propertiesRouter);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
};

startServer();
