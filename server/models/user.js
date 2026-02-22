import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "hospitalstaff", "admin"],
    default: "user"
  },

  isVerified: { type: Boolean, default: false },

  otp: String,
  otpExpiry: Date,

  walletBalance: {
    type: Number,
    default: 1000
  }

}, { timestamps: true });

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;