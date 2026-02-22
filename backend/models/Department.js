// models/Department.js
const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "",
    },
    head: {
        type: String, // Name of department head
    },
    contactNumber: {
        type: String,
    },
    services: [
        {
            type: String, // e.g., "Trauma care", "ECG", "MRI"
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    }
});

module.exports = mongoose.models.Department ||
    mongoose.model("Department", DepartmentSchema);
