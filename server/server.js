import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import authRouter from "./routes/user.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());


app.use(express.json());


app.use(authRouter);

connect();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});