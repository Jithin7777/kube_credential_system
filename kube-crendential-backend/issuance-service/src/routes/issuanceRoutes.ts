import { Router } from "express";
import { validate } from "../middlewares/validate";
import { credentialSchema } from "../validators/credential.validator";
import { issueCredential } from "../controllers/issuanceController";

const router = Router();

router.post("/issue", validate(credentialSchema), issueCredential);

export default router;
