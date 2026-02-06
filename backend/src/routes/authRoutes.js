import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

/// POST /api/auth/register - User registration
router.post("/register", registerUser);

/// POST /api/auth/login - User login
router.post("/login", loginUser);

export default router;
