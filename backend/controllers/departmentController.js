const mongoose = require("mongoose");
const Department = require("../models/Department.js");

// Create Department
exports.createDepartment = async (req, res) => {
    try {
        const { hospitalId, ...deptData } = req.body;

        if (!hospitalId || !mongoose.Types.ObjectId.isValid(hospitalId)) {
            return res.status(400).json({ error: "Valid Hospital ID is required" });
        }

        const hospital = await require("../models/Hospital").findById(hospitalId);
        if (!hospital) return res.status(404).json({ error: "Hospital not found" });

        const department = new Department({ ...deptData, hospital: hospitalId });
        await department.save();

        // Add to hospital's departments array
        hospital.departments.push(department._id);
        await hospital.save();

        res.status(201).json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get All Departments
exports.getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Department by ID
exports.getDepartmentById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Department ID format" });
        }
        const department = await Department.findById(req.params.id);
        if (!department) return res.status(404).json({ error: "Not found" });
        res.json(department);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Department
exports.updateDepartment = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Department ID format" });
        }
        const department = await Department.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!department) return res.status(404).json({ error: "Not found" });
        res.json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Department
exports.deleteDepartment = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ error: "Invalid Department ID format" });
        }
        const department = await Department.findByIdAndDelete(req.params.id);
        if (!department) return res.status(404).json({ error: "Not found" });
        res.json({ message: "Department deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
