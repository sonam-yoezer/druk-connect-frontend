import { useAuthStore } from "../../auth/store/authStore";
import type { IncomingVouchRequest } from "../types/vouchRequest";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getIncomingVouchRequests(): Promise<
  IncomingVouchRequest[]
> {
  const accessToken = useAuthStore.getState().accessToken;

  if (!accessToken) {
    throw new Error("You are not authenticated.");
  }

  const response = await fetch(
    `${BACKEND_URL}/api/v1/vouch-requests/me/incoming`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const responseText = await response.text();

  if (!response.ok) {
    throw new Error(responseText || "Unable to load incoming vouch requests.");
  }

  return JSON.parse(responseText);

  if (!response.ok) {
    throw new Error("Unable to load incoming vouch requests.");
  }

  return response.json();
}
