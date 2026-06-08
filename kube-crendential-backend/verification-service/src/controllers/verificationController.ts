// import { Request, Response } from "express";
// import { getAllCredentials, saveCredential } from "../models/verificationModel";

// const WORKER_ID = process.env.WORKER_ID || "worker-1";

// export function verifyCredential(req: Request, res: Response) {
//   const { id, email } = req.body as { id: string; email: string };

//   if (!id || !email) return res.status(400).json({ message: "id and email are required" });

//   const all = getAllCredentials();
//   const credential = all.find(c => c.id === id && c.email === email);

//   if (!credential) return res.status(404).json({ message: "Credential not found" });

//   // Add verification info
//   credential.verified = true;
//   credential.verifiedBy = WORKER_ID;
//   credential.verifiedAt = new Date().toISOString();

//   // Save back to the same file
//   saveCredential(credential);

//   res.status(200).json({
//     message: "Credential verified",
//     credential,
//   });
// }

import { Request, Response } from "express";
import { getAllCredentials, saveCredential } from "../models/verificationModel";

const WORKER_ID = process.env.WORKER_ID || "worker-1";

export function verifyCredential(req: Request, res: Response) {
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

  const all = getAllCredentials();
  const credential = all.find((c) => c.id === id && c.email === email);

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

  saveCredential(credential);

  return res.status(200).json({
    verified: true,
    message: "Credential verified successfully",
    credential,
  });
}
