import mongoose, { Schema } from "mongoose";
import { Credential } from "../types/verificationTypes";

const credentialSchema = new Schema<Credential>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    worker: {
      type: String,
    },
    timestamp: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: String,
    },
    verifiedAt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CredentialModel = mongoose.model<Credential>(
  "Credential",
  credentialSchema
);

export default CredentialModel;