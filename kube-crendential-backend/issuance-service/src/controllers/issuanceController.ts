import { Request, Response, NextFunction } from "express";
import { Credential } from "../types/credentialTypes";
import { randomUUID } from "crypto";
import CredentialModel from "../models/Credential";
import AppError from "../errors/AppError";
import logger from "../logger/logger";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function issueCredential(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info("Issue credential request received");

  try {
    const { name, email } = req.body;

    const exists = await CredentialModel.findOne({ email });

    if (exists) {
      logger.warn({ email }, "Duplicate credential request");
      throw new AppError("Credential already exists", 409);
    }

    const credential: Credential = {
      id: randomUUID(),
      name,
      email,
      worker: WORKER_ID,
      timestamp: new Date().toISOString(),
      verified: false,
    };

    await CredentialModel.create(credential);

    logger.info(
      {
        id: credential.id,
        email: credential.email,
        worker: WORKER_ID,
      },
      "Credential issued successfully"
    );

    return res.status(200).json({
      message: `credential issued by ${WORKER_ID}`,
      credential,
    });
  } catch (error) {
    next(error);
  }
}