const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");

// Create a new hospital
exports.createHospital = async (req, res) => {
    try {
        const hospital = new Hospital(req.body);
        await hospital.save();
        res.status(201).json(hospital);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all hospitals
exports.getHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Hospital ID format" });
        }
        const hospital = await Hospital.findById(req.params.id).populate("departments");
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });
        res.json(hospital);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update hospital
exports.updateHospital = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Hospital ID format" });
        }
        const hospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });
        res.json(hospital);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete hospital
exports.deleteHospital = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Hospital ID format" });
        }
        const hospital = await Hospital.findByIdAndDelete(req.params.id);
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });
        res.json({ message: "Hospital deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Find hospitals near a location
exports.findNearbyHospitals = async (req, res) => {
    try {
        const { longitude, latitude, maxDistance = 5000 } = req.query; // default 5km

        if (!longitude || !latitude) {
            return res.status(400).json({ error: "Longitude and latitude are required" });
        }

        const hospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: parseInt(maxDistance)
                }
            }
        });
        res.json(hospitals);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
