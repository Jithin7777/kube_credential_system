import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/database";
import logger from "./logger/logger";
const PORT = parseInt(process.env.PORT || "5000", 10);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info(`Issuance service running on port ${PORT}`);
  });
};

startServer();
