import { randomUUID } from "crypto";
import CredentialModel from "../models/Credential";
import AppError from "../errors/AppError";
import { Credential } from "../types/credentialTypes";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function createCredential(name: string, email: string) {
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

  return credential;
}