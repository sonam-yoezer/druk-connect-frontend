import type {
  ResendOtpPayload,
  ResendOtpResponse,
} from "../types/requestotp";

export async function resendOtp(
  payload: ResendOtpPayload,
): Promise<ResendOtpResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/resend-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message || "Failed to resend OTP",
    );
  }

  return data as ResendOtpResponse;
}