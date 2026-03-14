import { Router } from "express";
import { 
  createFunding, 
  getFundings, 
  getFundingById, 
  editFundingById, 
  deleteFundingById 
} from "../controllers/fundraiser.js"; 

const fundingRouter = Router();

fundingRouter.post('/fundraiser', createFunding);
fundingRouter.get('/fundraiser', getFundings);
fundingRouter.get('/fundraiser/:id', getFundingById);
fundingRouter.put('/fundraiser/:id', editFundingById);
fundingRouter.delete('/fundraiser/:id', deleteFundingById);

export default fundingRouter;