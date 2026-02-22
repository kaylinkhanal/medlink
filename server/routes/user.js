import express from "express";
import { login, signup, verifyOtp } from "../controllers/auth.js";
import authMiddleware from "../middleware/auth.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);

// Protected: returns current user data
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password -otp -otpExpiry");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user" });
    }
});

export default router;