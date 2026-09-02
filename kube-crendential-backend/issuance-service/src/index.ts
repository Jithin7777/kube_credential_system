import app from "./app";
import { connectDB } from "./config/database";
import logger from "./logger/logger";
import { env } from "./config/env";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(`Issuance service running on port ${env.PORT}`);
  });
};

startServer();