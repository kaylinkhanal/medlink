import Funding from "../models/fundraiser.js";

const createFunding = async (req, res) => {
  try {
    const funding = await Funding.create(req.body);
    res.status(201).json({
      message: "Funding created successfully!",
      data: funding
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
  
const getFundings = async (req, res) => {
  try {
    const fundings = await Funding.find();
    res.json(fundings);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getFundingById = async (req, res) => {
  try {
    const funding = await Funding.findById(req.params.id);
    if (!funding) return res.status(404).send("Funding not found");
    res.json(funding);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const editFundingById = async (req, res) => {
  try {
    const updatedFunding = await Funding.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Edited!",
      data: updatedFunding
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteFundingById = async (req, res) => {
  try {
    await Funding.findByIdAndDelete(req.params.id);
    res.send("Deleted success!");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export {
  createFunding,
  getFundings,
  getFundingById,
  editFundingById,
  deleteFundingById
};