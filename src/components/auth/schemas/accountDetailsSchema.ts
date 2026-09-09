import { z } from "zod";

export const accountDetailsSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters.")
    .max(50, "First name must be 50 characters or less."),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters.")
    .max(50, "Last name must be 50 characters or less."),

  email: z.string().trim().email("Enter a valid email address."),

  phoneNumber: z
    .string()
    .trim()
    .regex(/^[17]\d{7}$/, "Enter a valid Bhutanese mobile number."),

  password: z
    .string()
    .min(10, "Use at least 10 characters.")
    .max(72, "Password must be 72 characters or less."),
});

export type AccountDetailsForm = z.infer<typeof accountDetailsSchema>;
