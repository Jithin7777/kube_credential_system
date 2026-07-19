import { z } from "zod";

export const verificationSchema = z.object({
  id: z
    .string()
    .trim()
    .min(1, { error: "Credential ID is required" }),

  email: z
    .string()
    .trim()
    .email({ error: "Please provide a valid email address" }),
});