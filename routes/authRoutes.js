import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
const router = express.Router();

// ✅ Route: Register new user
router.post("/register", registerUser);

// ✅ Route: Login existing user
router.post("/login", loginUser);

export default router;
