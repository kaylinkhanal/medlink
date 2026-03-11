import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['tenant', 'landlord', 'admin'],
    default: 'tenant'
  },
  phone: { type: String },
  profilePhoto: { type: String },          // URL to uploaded image
  isVerified: { type: Boolean, default: false },
  verifyToken: { type: String, index: true },
  verifyTokenExpiry: Date,
  walletBalance: { type: Number, default: 0 },
  savedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'rooms' }] // bookmarked listings
}, { timestamps: true });

const User = mongoose.models.users || mongoose.model('users', userSchema);
export default User;