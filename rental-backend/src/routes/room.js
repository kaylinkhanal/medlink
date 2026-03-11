import { Router } from "express";
import {
  createRoom,
  getAllRooms,
  getRoomById,
  editRoomById,
  deleteRoomById
} from "../controllers/room.js";

const roomRouter = Router();

// Routes for Rooms
roomRouter.post('/rooms', createRoom);
roomRouter.get('/rooms', getAllRooms);
roomRouter.get('/rooms/:id', getRoomById);
roomRouter.put('/rooms/:id', editRoomById);
roomRouter.delete('/rooms/:id', deleteRoomById);

export default roomRouter;