import { apiFetch } from "@/src/lib/api/client";
import type {
  SubmitAppealRequest,
  SubmitAppealResponse,
} from "../types/listerAppeal";

export async function submitAppeal(
  data: SubmitAppealRequest,
): Promise<SubmitAppealResponse> {
  const response = await apiFetch("/api/v1/lister-restrictions/me/appeals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || `Failed to submit appeal (${response.status})`);
  }

  return (await response.json()) as SubmitAppealResponse;
}
