import axios from "axios";
import type { VerificationResponse } from "../types/apiResponses";

const API_URL = "http://localhost:5001/api/verify";

export const verifyCredential = async (
  id: string,
  email: string
): Promise<VerificationResponse> => {
  const response = await axios.post<VerificationResponse>(API_URL, { id, email });
  return response.data;
};
