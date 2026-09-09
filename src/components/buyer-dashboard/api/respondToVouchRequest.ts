import { useAuthStore } from "../../auth/store/authStore";
import type {
  IncomingVouchRequest,
  RespondVouchRequestResponse,
} from "../types/vouchRequest";

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

  if (!response.ok) {
    throw new Error("Unable to load incoming vouch requests.");
  }

  return response.json();
}

export async function respondToVouchRequest(
  requestId: string,
  accept: boolean,
): Promise<RespondVouchRequestResponse> {
  const { accessToken, user } = useAuthStore.getState();

  if (!accessToken || !user) {
    throw new Error("You are not authenticated.");
  }

  const response = await fetch(
    `${BACKEND_URL}/api/v1/vouch-requests/users/${user.id}/requests/${requestId}/respond`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accept,
      }),
    },
  );

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error || "Unable to respond to vouch request.");
  }

  return response.json();
}
