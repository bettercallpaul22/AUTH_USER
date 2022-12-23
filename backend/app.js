import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AuthRoute from "./routes/AuthRoute.js";
import PostRoute from "./routes/PostRoute.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

const url = "mongodb://localhost:27017/userAuth";
mongoose
  .connect(url)
  .then(() => console.log("connected to mongoDB"))
  .catch((error) => console.log(error));

const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`app running on PORT ${PORT}`);
});
 
app.use("/", AuthRoute);
app.use("/", PostRoute);
