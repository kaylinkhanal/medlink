import express from "express";
import { signup, verifyCode, login } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify", verifyCode);
router.post("/login", login);

export default router;