import { apiFetch } from "@/src/lib/api/client";
import { useAuthStore } from "../../auth/store/authStore";
import type {
  IncomingVouchRequest,
  RespondVouchRequestResponse,
} from "../types/vouchRequest";

export async function getIncomingVouchRequests(): Promise<
  IncomingVouchRequest[]
> {
  const response = await apiFetch("/api/v1/vouch-requests/me/incoming", {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.text();

    throw new Error(error || "Unable to load incoming vouch requests.");
  }

  return response.json();
}
