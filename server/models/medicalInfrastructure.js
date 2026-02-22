import mongoose, { Schema } from "mongoose";

const medicalInfrastructureSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, lowercase: true, trim: true },
  
  // Facilities
  hasICU: { type: Boolean, default: false },
  hasWheelchair: { type: Boolean, default: false },
  hasEmergency: { type: Boolean, default: false },
  hasBloodBank: { type: Boolean, default: false },
  hasAmbulanceOnCall: { type: Boolean, default: false },

  // Location Data
  // GeoJSON is the standard for MongoDB proximity searches
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },

  // Relationship to Departments
  departments: [{
    type: Schema.Types.ObjectId,
    ref: 'Department'
  }]
}, { timestamps: true });

// Indexing for location-based searches (e.g., "Hospitals near me")
medicalInfrastructureSchema.index({ location: "2dsphere" });

const MedicalInfrastructure = mongoose.model('MedicalInfrastructure', medicalInfrastructureSchema);
export default MedicalInfrastructure;