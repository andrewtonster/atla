import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db.js";
import characterRoutes from "./routes/characterRoutes.js";
import cors from "cors";
// every 24 hours need to choose an answer from the database
// that answer choice must be the same for everyone, so that value cannot be calculated
// here
//
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json()); // allows us to parse incoming json
connectDB();
app.listen(3000, () => {
  console.log("app is running");
});

app.use("/api", characterRoutes);

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend's origin
  })
);
