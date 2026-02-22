const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospitalController");

// CRUD routes
router.post("/", hospitalController.createHospital);
router.get("/", hospitalController.getHospitals);
// Nearby search
router.get("/nearby/search", hospitalController.findNearbyHospitals);

// ID-based routes
router.get("/:id", hospitalController.getHospitalById);
router.put("/:id", hospitalController.updateHospital);
router.delete("/:id", hospitalController.deleteHospital);

module.exports = router;
