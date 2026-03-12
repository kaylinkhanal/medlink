import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },

  hospital: {
    type: Schema.Types.ObjectId,
    ref: "MedicalInfrastructure",
    required: true
  },

  // Pickup Location
  pickupLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  },

  // Drop Location
  dropLocation: {
    address: {
      type: String,
      required: true
    },
    coordinates: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  },

  type: {
    type: String,
    enum: ["Ambulance", "Appointment", "Emergency"],
    default: "Appointment"
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "In-Transit", "Completed", "Cancelled"],
    default: "Pending"
  },

  estimatedCost: {
    type: Number,
    default: 0
  },

  notes: {
    type: String,
    trim: true
  }

}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;