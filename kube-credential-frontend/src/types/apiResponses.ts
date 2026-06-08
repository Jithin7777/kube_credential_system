import type { Credential } from "./credentialTypes";

export interface IssueResponse {
  message: string;
  credential: Credential;
}

export interface VerificationResponse {
  verified: boolean;
  message: string;
  credential: Credential;
}
