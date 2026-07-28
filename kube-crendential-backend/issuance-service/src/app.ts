import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import issuanceRoutes from "./routes/issuanceRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", issuanceRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use(errorHandler);  
export default app;
