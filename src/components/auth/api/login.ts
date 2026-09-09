import { AuthApiError } from "../types/AuthApiError";
import { LoginRequest, LoginResponse } from "../types/login";

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`,
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
      error?.message || "Unable to sign in.",
      error?.code || "LOGIN_FAILED",
      error?.status || res.status,
    );
  }

  return res.json();
}
