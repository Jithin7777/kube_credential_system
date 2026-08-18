import { z } from "zod";

export const verificationSchema = z.object({
  id: z
    .string({
      error: "Credential ID is required",
    })
    .trim()
    .uuid({
      error: "Please provide a valid credential ID",
    }),

  email: z
    .string()
    .trim()
    .email({
      error: "Please provide a valid email address",
    }),
});