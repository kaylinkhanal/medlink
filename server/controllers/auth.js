import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail.js";
import crypto from "crypto";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const code = crypto.randomInt(100000, 999999).toString();
    const codeExpiry = Date.now() + 3600000; 

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      verifyToken: code,
      verifyTokenExpiry: codeExpiry
    });

    // Send email
    await sendMail({ email, code });

    res.status(201).json({ message: "Verification code sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({
      email,
      verifyToken: code,
      verifyTokenExpiry: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired code" });

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user || !user.isVerified)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: `Welcome ${user.username}`, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export { signup, verifyCode, login };
