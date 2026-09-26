import User from "../model/User.js";
import { hashPassword } from "../utils/helpers.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const passwordPattern = /^.{8,}$/;
    if (!passwordPattern.test(password)) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }

    if (!["seeker", "advertiser"].includes(role)) {
      return res.status(400).json({ error: "A valid role is required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const hashedPassword = await hashPassword(password);
    await User.create({
      name,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({ message: "New user added successfully" });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).json({ error: "Email already in use" });
    }

    return res.status(500).json({ error: "Could not create user" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userInfo = await User.findById(req.user.id).select("-password");

    if (!userInfo) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(userInfo);
  } catch {
    return res.status(500).json({ error: "Could not load profile" });
  }
};
