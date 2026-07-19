import { Router } from "express";
import { verifyCredential } from "../controllers/verificationController";
import { validate } from "../middlewares/validate";
import { verificationSchema } from "../validators/verification.validator";

const router = Router();

router.post(
  "/verify",
  validate(verificationSchema),
  verifyCredential
);

export default router;