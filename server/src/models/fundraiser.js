import mongoose, { Schema } from 'mongoose';

const fundingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    default: 'Give a Hand, Light a Future'
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Blood Donation'
  },
  about: {
    type: String,
    required: true
  },
  goalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  raisedAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  expiryDate: {
    type: Date,
    required: true
  },
  donations: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index expiryDate for queries
fundingSchema.index({ expiryDate: 1 });
// Text index for quick search on title/about
fundingSchema.index({ title: 'text', about: 'text' });

// Virtual: days left until expiry
fundingSchema.virtual('daysLeft').get(function() {
  if (!this.expiryDate) return null;
  const today = new Date();
  const diff = this.expiryDate.getTime() - today.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
});

// Virtual: number of unique donors
fundingSchema.virtual('donorCount').get(function() {
  return this.donations ? this.donations.length : 0;
});

// Virtual: progress percentage toward goal
fundingSchema.virtual('progress').get(function() {
  if (!this.goalAmount || this.goalAmount === 0) return 0;
  return Math.min(100, Math.round((this.raisedAmount / this.goalAmount) * 100));
});

// Virtual: whether campaign is expired
fundingSchema.virtual('isExpired').get(function() {
  if (!this.expiryDate) return false;
  return new Date() > this.expiryDate;
});

// Instance method: add a donation and update raisedAmount
fundingSchema.methods.addDonation = async function(userId, amount) {
  if (!amount || amount <= 0) throw new Error('Invalid donation amount');
  this.donations.push({ user: userId, amount });
  this.raisedAmount = (this.raisedAmount || 0) + amount;
  return this.save();
};

// Static helper: find active (not expired) campaigns
fundingSchema.statics.findActive = function() {
  return this.find({ expiryDate: { $gt: new Date() } });
};

const Funding = mongoose.model('Funding', fundingSchema);

export default Funding;