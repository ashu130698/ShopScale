import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/roleMiddleware.js";

const router = express.Router();

/// POST /api/auth/register - User registration
router.post("/register", registerUser);

/// POST /api/auth/login - User login
router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.get("/admin-test", protect, adminOnly, (req, res) => {
    res.json({ message: "Welcome admin" });
})
export default router;
