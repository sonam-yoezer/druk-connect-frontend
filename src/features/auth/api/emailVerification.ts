import type { VerifyOtpRequest, VerifyOtpResponse } from "../types/signup";

export async function verifyOtp(
  data: VerifyOtpRequest,
): Promise<VerifyOtpResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const text = await res.text();

    throw new Error(text || "Failed to verify OTP");
  }

  return res.json();
}
