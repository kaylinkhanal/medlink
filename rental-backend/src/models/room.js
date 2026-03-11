import mongoose from "mongoose";

const availableRoomSchema = new mongoose.Schema({
  title: { type: String, required: true },              // e.g. "Cozy Studio in Kathmandu"
  description: { type: String },

  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },

  // Location
  address: { type: String, required: true },
  city: { type: String, required: true },
  barangay: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },

  // Room details
  roomType: {
    type: String,
    enum: ['single', 'double', 'studio', 'apartment', 'dormitory', 'entire_unit'],
    required: true
  },
  floorArea: { type: Number },                          // in sqm
  maxOccupants: { type: Number, default: 1 },
  floor: { type: Number },

  // Pricing
  monthlyRent: { type: Number, required: true },
  securityDeposit: { type: Number, default: 0 },
  advancePayment: { type: Number, default: 0 },         // e.g. 1 month advance

  // Utilities
  utilitiesIncluded: {
    electricity: { type: Boolean, default: false },
    water: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false }
  },

  // Amenities
  amenities: [{
    type: String,
    enum: ['aircon', 'parking', 'laundry', 'kitchen', 'bathroom', 'furnished', 'cctv', 'elevator']
  }],

  // Media
  images: [{ type: String }],                          // array of image URLs

  // Rules
  rules: {
    petsAllowed: { type: Boolean, default: false },
    smokingAllowed: { type: Boolean, default: false },
    visitorsAllowed: { type: Boolean, default: true },
    curfew: { type: String }                           // e.g. "10:00 PM"
  },

  // Availability
  status: {
    type: String,
    enum: ['available', 'occupied', 'reserved', 'unlisted'],
    default: 'available'
  },
  availableFrom: { type: Date, default: Date.now },

  // Ratings
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }

}, { timestamps: true });

const AvailableRoom = mongoose.models.rooms || mongoose.model('rooms', availableRoomSchema);
export default AvailableRoom;