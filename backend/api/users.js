import express from "express";
import { createUser, getProfile } from "../controller/userController.js";
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post("/", createUser);
router.get("/profile", checkToken, getProfile);

export default router;
