import { Request, Response, NextFunction } from "express";
import { Credential } from "../types/credentialTypes";
import { randomUUID } from "crypto";
import CredentialModel from "../models/Credential";
import AppError from "../errors/AppError";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function issueCredential(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log("issueCredential controller called");
  try {
    const { name, email} = req.body;

    const exists = await CredentialModel.findOne({ email });

    if (exists) {
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

    return res.status(200).json({
      message: `credential issued by ${WORKER_ID}`,
      credential,
    });
  } catch (error) {
    next(error);
  }
}
