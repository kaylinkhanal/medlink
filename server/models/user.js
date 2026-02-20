import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin', 'hospitalstaff'] 
  },
  // address: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String, index: true },
  verifyTokenExpiry: Date
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;
