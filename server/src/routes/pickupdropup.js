import { Router } from "express";
import { createpickupdropup, deletePickupDropupById, editPickupDropupById, getAllPickupDropups, getPickupDropupById } from "../controllers/pickupdropup.js";


const pickupdropupRouter = Router();

pickupdropupRouter.post('/pickupdropup', createpickupdropup);
pickupdropupRouter.get('/pickupdropups', getAllPickupDropups);
pickupdropupRouter.get('/pickupdropups/:id', getPickupDropupById);
pickupdropupRouter.put('/pickupdropups/:id', editPickupDropupById);
pickupdropupRouter.delete('/pickupdropups/:id', deletePickupDropupById);

export default pickupdropupRouter;