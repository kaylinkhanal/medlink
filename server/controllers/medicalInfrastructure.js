import MedicalInfrastructure from "../models/medicalInfrastructure.js";

const createMedicalInfrastructure = async (req, res) => {
  try {
    const infrastructure = await MedicalInfrastructure.create(req.body);
    res.status(201).json({
      message: 'Medical Infrastructure created successfully!',
      data: infrastructure
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMedicalInfrastructures = async (req, res) => {
  try {
    // .populate('departments') replaces IDs with actual department data
    const infrastructures = await MedicalInfrastructure.find().populate('departments');
    res.json(infrastructures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMedicalInfrastructureById = async (req, res) => {
  try {
    const infrastructure = await MedicalInfrastructure.findById(req.params.id).populate('departments');
    if (!infrastructure) return res.status(404).json({ message: "Infrastructure not found" });
    res.json(infrastructure);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editMedicalInfrastructureById = async (req, res) => {
  try {
    const updatedInfra = await MedicalInfrastructure.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    ).populate('departments');
    
    if (!updatedInfra) return res.status(404).json({ message: "Infrastructure not found" });
    
    res.json({
      message: 'Updated successfully!',
      data: updatedInfra
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMedicalInfrastructureById = async (req, res) => {
  try {
    const deleted = await MedicalInfrastructure.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Infrastructure not found" });
    res.send('Deleted successfully!');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { 
  createMedicalInfrastructure, 
  getAllMedicalInfrastructures, 
  getMedicalInfrastructureById, 
  editMedicalInfrastructureById, 
  deleteMedicalInfrastructureById 
};