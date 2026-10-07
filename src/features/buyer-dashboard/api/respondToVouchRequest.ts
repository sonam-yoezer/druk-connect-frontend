import { apiFetch } from "@/src/lib/api/client";
import { useAuthStore } from "../../auth/store/authStore";
import type { RespondVouchRequestResponse } from "../types/vouchRequest";

export async function respondToVouchRequest(
  requestId: string,
  accept: boolean,
): Promise<RespondVouchRequestResponse> {
  const user = useAuthStore.getState().user;

  if (!user) {
    throw new Error("You are not authenticated.");
  }

  const response = await apiFetch(
    `/api/v1/vouch-requests/users/${user.id}/requests/${requestId}/respond`,
    {
      method: "POST",
      headers: {
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
