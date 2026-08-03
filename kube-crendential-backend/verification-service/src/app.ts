import express from "express";
import cors from "cors";
import helmet from "helmet";

import verificationRoutes from "./routes/verificationRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", verificationRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Service is running" });
});

app.use(errorHandler);

export default app;