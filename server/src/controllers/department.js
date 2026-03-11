import { Department } from "../models/department.js";

const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({
      message: 'Department created successfully!',
      data: department
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) return res.status(404).send("Department not found");
    res.json(department);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editDepartmentById = async (req, res) => {
  try {
    const updatedDept = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({
      message: 'Edited!',
      data: updatedDept
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteDepartmentById = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.send('Deleted success!');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { 
  createDepartment, 
  getDepartments, 
  getDepartmentById, 
  editDepartmentById, 
  deleteDepartmentById 
};