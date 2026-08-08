import express from "express";
import cors from "cors";
import helmet from "helmet";

import verificationRoutes from "./routes/verificationRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(rateLimiter);

app.use(express.json());

app.use("/api", verificationRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Service is running" });
});

app.use(errorHandler);

export default app;