import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import { verifyCredentialById } from "../services/verificationService";

export async function verifyCredential(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info("verifyCredential controller called");

  try {
    const { id, email } = req.body;

    const credential = await verifyCredentialById(id, email);

    logger.info(
      `Credential verified successfully: ${credential.email}`,
    );

    return res.status(200).json({
      verified: true,
      message: "Credential verified successfully",
      credential,
    });
  } catch (error) {
    next(error);
  }
}