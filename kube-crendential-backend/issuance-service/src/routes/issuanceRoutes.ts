import express from "express";
import { issueCredential } from "../controllers/issuanceController";

const router = express.Router();
router.post("/issue", issueCredential);

export default router;
