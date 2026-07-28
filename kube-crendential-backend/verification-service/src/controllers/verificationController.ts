import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import CredentialModel from "../models/Credential";
import logger from "../logger/logger";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function verifyCredential(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info("verifyCredential controller called");

  try {
    const { id, email } = req.body;

    const credential = await CredentialModel.findOne({ id, email });

    if (!credential) {
      throw new AppError("Credential not found", 404);
    }

    if (credential.verified) {
      throw new AppError("Credential already verified", 409);
    }

    credential.verified = true;
    credential.verifiedBy = WORKER_ID;
    credential.verifiedAt = new Date().toISOString();

    await credential.save();

    logger.info(`Credential verified successfully: ${credential.email}`);

    return res.status(200).json({
      verified: true,
      message: "Credential verified successfully",
      credential,
    });
  } catch (error) {
    next(error);
  }
}