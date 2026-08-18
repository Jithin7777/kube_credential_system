import CredentialModel from "../models/Credential";
import AppError from "../errors/AppError";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function verifyCredentialById(
  id: string,
  email: string,
) {
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

  return credential;
}