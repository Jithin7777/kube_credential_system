import { Request, Response } from "express";
import { getAllCredentials, saveCredential } from "../models/credentialModel";
import { Credential } from "../types/credentialTypes";
import { randomUUID } from "crypto";
const WORKER_ID = process.env.WORKER_ID || "worker-1";

export function issueCredential(req: Request, res: Response) {
  const { name, email } = req.body as { name: string; email: string };

  if (!name || !email) {
    return res.status(400).json({ message: "name and email required" });
  }

  const all = getAllCredentials();

  const exists = all.find((c) => c.email === email);

  if (exists) {
    return res.status(409).json({
      message: "Credential already exists",
      credential: exists,
    });
  }

  const id = randomUUID();

  const credential: Credential = {
    name,
    email,
    id,
    worker: WORKER_ID,
    timestamp: new Date().toISOString(),
  };

  saveCredential(credential);

  res.status(200).json({
    message: `credential issued by ${WORKER_ID}`,
    credential,
  });
}
