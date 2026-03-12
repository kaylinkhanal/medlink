import { Router } from "express";
import { createpickupdropup, deletePickupDropupById, editPickupDropupById, getAllPickupDropups, getPickupDropupById, updatePickUpStatus } from "../controllers/pickupdropup.js";


const pickupdropupRouter = Router();

pickupdropupRouter.post('/ambulance-request', createpickupdropup);
pickupdropupRouter.get('/ambulance-request', getAllPickupDropups);
pickupdropupRouter.get('/ambulance-request/:id', getPickupDropupById);
pickupdropupRouter.put('/ambulance-request/:id', editPickupDropupById);
pickupdropupRouter.delete('/ambulance-request/:id', deletePickupDropupById);
pickupdropupRouter.patch('/ambulance-request/:id',  updatePickUpStatus);
export default pickupdropupRouter;