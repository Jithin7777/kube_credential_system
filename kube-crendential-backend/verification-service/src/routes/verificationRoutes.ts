import { Router } from "express";
import { verifyCredential } from "../controllers/verificationController";

const router = Router();
router.post("/verify", verifyCredential);

export default router;
