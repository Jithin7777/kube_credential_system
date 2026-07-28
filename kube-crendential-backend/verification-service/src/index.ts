import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/database";
import logger from "./logger/logger";

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Verification service running on port ${PORT}`);
  });
};

startServer();