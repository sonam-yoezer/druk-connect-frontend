import { AuthApiError } from "../types/AuthApiError";
import { SignupRequest, SignupResponse } from "../types/signup";

export async function signup(data: SignupRequest): Promise<SignupResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/signup`,
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
    const error = await res.json().catch(() => null);

    throw new AuthApiError(
      error?.message || "Failed to create account.",
      error?.code || "UNKNOWN_ERROR",
      error?.status || res.status,
    );
  }

  return res.json();
}
