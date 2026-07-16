import { z } from "zod";

export const credentialSchema = z.object({
  name: z
    .string({
      error: "Name is required",
    })
    .trim()
    .min(2, {
      error: "Name must be at least 2 characters long",
    }),

  email: z
    .string({
      error: "Email is required",
    })
    .trim()
    .email({
      error: "Please provide a valid email address",
    }),
});