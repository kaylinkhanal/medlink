import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const saltRounds = 10;
const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    //step 1:  check if username or email exists
    const existingEmail = await User.findOne({ email });
    // yes: send error message that username or email already exists
    if (existingEmail) {
      return res.status(409).send({ message: "Email already exists" });
    }
    // no :
    // Step 2:
    const hashPassword = await bcrypt.hash(password, saltRounds);
    // hash the password
    // Step 3:
    // create user
    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
    });
    res.status(201).send({ message: "Signup successful", user });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send({ message: "Signup failed", error: err.message });
  }
};

const verifyCode = async (req, res) => {
  try {
    res
      .status(501)
      .send({ message: "Verify code endpoint not yet implemented" });
  } catch (err) {
    console.error("Verify code error:", err);
    res.status(500).send({ message: "Verify code failed", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    // step 1: check if email exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // no :
    if (!user) {
      return res.status(404).send({ message: "Email does not exist" });
    }
    // send error message that email does not exist
    // yes

    // step 2: compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    // no:  send error message that password is incorrect
    if (!passwordMatch) {
      return res.status(401).send({ message: "Incorrect password" });
    }
    // yes:
    // step 3:
    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET || "fallback_secret_key",
    );
    res.send({ token, message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send({ message: "Login failed", error: err.message });
  }
};

export { signup, verifyCode, login };
