import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import authRouter from "./routes/user.js";
import departmentRouter from "./routes/department.js";
import medicalInfrastructureRouter from "./routes/medicalInfrastructure.js";
import ambulanceRequest from "./routes/pickupdropup.js";
import sendMail from "./utils/sendMail.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.use(authRouter);
app.use(departmentRouter);
app.use(medicalInfrastructureRouter);
app.use(ambulanceRequest)

connect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
