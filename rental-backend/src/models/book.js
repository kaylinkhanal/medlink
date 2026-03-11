import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

  room: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'rooms', 
    required: true 
  },
  tenant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users', 
    required: true 
  },

  // Dates
  moveInDate: { type: Date, required: true },
  moveOutDate: { type: Date },                    // optional, for fixed-term rentals
  leaseDurationMonths: { type: Number },          // e.g. 6, 12

  // Booking status flow:
  // pending → approved → active → completed
  //         ↘ rejected
  //                    ↘ cancelled
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },

  // Payment breakdown at time of booking
  monthlyRent: { type: Number, required: true },
  securityDeposit: { type: Number, required: true },
  advancePayment: { type: Number, required: true },
  totalMoveInCost: { type: Number, required: true }, // monthlyRent + securityDeposit + advancePayment

  // Payment status
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'partial', 'paid'],
    default: 'unpaid'
  },
  amountPaid: { type: Number, default: 0 },

  // Landlord response
  approvedAt: { type: Date },
  rejectedAt: { type: Date },
  rejectionReason: { type: String },
  cancelledAt: { type: Date },
  cancellationReason: { type: String },

  // Optional message from tenant when booking
  message: { type: String },

}, { timestamps: true });

const Booking = mongoose.models.bookings || mongoose.model('bookings', bookingSchema);
export default Booking;
