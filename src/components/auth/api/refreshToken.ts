import type { LoginResponse } from "../types/login";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export async function refreshToken(
  refreshToken: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
}
