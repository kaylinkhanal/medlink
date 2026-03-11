import { Router } from "express";
import { 
  createMedicalInfrastructure, 
  getAllMedicalInfrastructures, 
  getMedicalInfrastructureById, 
  editMedicalInfrastructureById, 
  deleteMedicalInfrastructureById 
} from "../controllers/medicalInfrastructure.js";

const medicalInfrastructureRouter = Router();

// Routes for Medical Infrastructure
medicalInfrastructureRouter.post('/medical-infrastructures', createMedicalInfrastructure);
medicalInfrastructureRouter.get('/medical-infrastructures', getAllMedicalInfrastructures);
medicalInfrastructureRouter.get('/medical-infrastructures/:id', getMedicalInfrastructureById);
medicalInfrastructureRouter.put('/medical-infrastructures/:id', editMedicalInfrastructureById);
medicalInfrastructureRouter.delete('/medical-infrastructures/:id', deleteMedicalInfrastructureById);

export default medicalInfrastructureRouter;