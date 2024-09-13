import mongoose from "mongoose";
import dotenv from "dotenv";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Optionally, you can exit the process if the connection fails
    // process.exit(1);
  }
};

export { connectDB };
