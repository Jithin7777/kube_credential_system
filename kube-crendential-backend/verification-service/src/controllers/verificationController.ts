import { Request, Response } from "express";
import CredentialModel from "../models/Credential";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export async function verifyCredential(req: Request, res: Response) {
  try {
    const { id, email } = req.body as { id: string; email: string };

    if (!id || !email) {
      return res.status(400).json({
        verified: false,
        message: "id and email are required",
        credential: {
          id: id || "",
          email: email || "",
          verified: false,
          verifiedBy: "N/A",
          verifiedAt: null,
        },
      });
    }

    const credential = await CredentialModel.findOne({ id, email });

    if (!credential) {
      return res.status(200).json({
        verified: false,
        message: "Credential not found",
        credential: {
          id,
          email,
          verified: false,
          verifiedBy: "N/A",
          verifiedAt: null,
        },
      });
    }

    if (credential.verified) {
      return res.status(200).json({
        verified: true,
        message: "Credential already verified",
        credential,
      });
    }

    credential.verified = true;
    credential.verifiedBy = WORKER_ID;
    credential.verifiedAt = new Date().toISOString();

    await credential.save();

    return res.status(200).json({
      verified: true,
      message: "Credential verified successfully",
      credential,
    });
  } catch (error) {
    console.error("Error verifying credential:", error);

    return res.status(500).json({
      verified: false,
      message: "Internal Server Error",
    });
  }
}