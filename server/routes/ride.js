
import { Router } from "express"
import Ride from "../models/ride.js"
import { createRide, deleteRidesById, editRidesById, getRides, getRidesById } from "../controllers/ride.js"

const rideRouter = Router()
rideRouter.post('/rides', createRide)
rideRouter.get('/rides', getRides)
rideRouter.get('/rides/:id', getRidesById )
rideRouter.put('/rides/:id', editRidesById)
rideRouter.delete('/rides/:id', deleteRidesById )

export default rideRouter
