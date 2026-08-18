import { Request, Response, NextFunction } from "express";
import logger from "../logger/logger";
import { createCredential } from "../services/issuanceService";

export async function issueCredential(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info("Issue credential request received");

  try {
    const { name, email } = req.body;

    const credential = await createCredential(name, email);

    logger.info(
      {
        id: credential.id,
        email: credential.email,
        worker: credential.worker,
      },
      "Credential issued successfully",
    );

    return res.status(200).json({
      message: `credential issued by ${credential.worker}`,
      credential,
    });
  } catch (error) {
    next(error);
  }
}