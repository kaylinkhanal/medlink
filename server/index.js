import express from 'express'
const app = express()

const port = 8080
import connect from './db/connect.js';
import rideRouter from './routes/ride.js';
connect();
app.use(express.json())
app.use(rideRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


