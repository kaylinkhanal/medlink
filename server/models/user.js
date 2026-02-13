import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String, index: true },
  verifyTokenExpiry: Date
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
