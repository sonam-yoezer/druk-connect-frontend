import { apiFetch } from "@/src/lib/api/client";
import {
  WithdrawVouchRequest,
  WithdrawVouchResponse,
} from "../types/vouchRequest";

export async function withdrawVouch(
  vouchId: string,
  data: WithdrawVouchRequest,
): Promise<WithdrawVouchResponse> {
  const response = await apiFetch(
    `/api/v1/vouch-requests/vouches/${vouchId}/withdraw`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to submit vouch withdrawal request.");
  }

  return response.json();
}
