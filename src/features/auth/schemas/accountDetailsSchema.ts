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

  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  /*
   * Australian mobile number.
   *
   * Accepted:
   * 412345678
   * 0412345678
   * 412 345 678
   * 0412 345 678
   */
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => {
        const digits = value.replace(/\D/g, "");

        return (
          /^4\d{8}$/.test(digits) ||
          /^04\d{8}$/.test(digits)
        );
      },
      {
        message: "Enter a valid Australian mobile number.",
      },
    ),

  password: z
    .string()
    .min(10, "Use at least 10 characters.")
    .max(72, "Password must be 72 characters or less."),
});

export type AccountDetailsForm =
  z.infer<typeof accountDetailsSchema>;