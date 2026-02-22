// models/Hospital.js
const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: true,
        trim: true,
    },
    // GeoJSON Point for Mapping
    location: {
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String
    },
    contact: {
        phone: String,
        website: String
    },
    status: {
        type: String,
        enum: ["Operational", "Emergency Only", "Closed"],
        default: "Operational",
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    departments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    }]
});

// IMPORTANT: Create a 2dsphere index for proximity searches
HospitalSchema.index({ location: "2dsphere" });

module.exports = mongoose.models.Hospital || mongoose.model("Hospital", HospitalSchema);