import { refreshToken } from "@/src/features/auth/api/refreshToken";
import { useAuthStore } from "@/src/features/auth/store/authStore";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

let refreshPromise: Promise<string> | null = null;

async function getFreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const { refreshToken: currentRefreshToken } = useAuthStore.getState();

      if (!currentRefreshToken) {
        throw new Error("No refresh token available");
      }

      const session = await refreshToken(currentRefreshToken);

      useAuthStore.getState().setSession(session);

      return session.accessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const { accessToken } = useAuthStore.getState();

  const headers = new Headers(options.headers);

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  try {
    const newAccessToken = await getFreshAccessToken();

    const retryHeaders = new Headers(options.headers);

    retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: retryHeaders,
    });

    return response;
  } catch (error) {
    useAuthStore.getState().clearSession();

    throw error;
  }
}
