import express from "express";
import verificationRoutes from "./routes/verificationRoutes";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors())
app.use(express.json());
app.use("/api", verificationRoutes);
app.get("/health", (_req, res) => {
  res.json({ status: "ok", message: "Service is running" });
});
app.use(errorHandler);
export default app;
