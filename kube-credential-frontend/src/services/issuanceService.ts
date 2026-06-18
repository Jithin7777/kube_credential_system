import axios from "axios";
import type { IssueResponse } from "../types/apiResponses";

const API_URL = "http://localhost:5002/issue";

export const issueCredential = async (name: string, email: string): Promise<IssueResponse> => {
  const response = await axios.post<IssueResponse>(API_URL, { name, email });
  return response.data;
};
