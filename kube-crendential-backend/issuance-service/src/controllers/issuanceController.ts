import { Request, Response } from "express";
import { Credential } from "../types/credentialTypes";
import { randomUUID } from "crypto";
import CredentialModel from "../models/Credential";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function issueCredential(req: Request, res: Response) {
  try {
    const { name, email, worker } = req.body;

    const exists = await CredentialModel.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: "Credential already exists",
        credential: exists,
      });
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
    console.error("Error issuing credential:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}