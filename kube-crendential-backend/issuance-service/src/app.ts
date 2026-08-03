import express from "express";
import cors from "cors";
import helmet from "helmet";

import issuanceRoutes from "./routes/issuanceRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/", issuanceRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

export default app;
