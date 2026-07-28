import mongoose from "mongoose";
import logger from "../logger/logger";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    logger.info("MongoDB Connected");
  } catch (error) {
    logger.error(error, "MongoDB Connection Failed");
    process.exit(1);
  }
};