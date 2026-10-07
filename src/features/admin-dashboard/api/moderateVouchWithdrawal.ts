import { apiFetch } from "@/src/lib/api/client";

import type {
  ModerateVouchWithdrawalRequest,
  ModerateVouchWithdrawalResponse,
} from "../types/vouchWithdrawal";

export async function moderateVouchWithdrawal(
  withdrawalRequestId: string,
  data: ModerateVouchWithdrawalRequest,
): Promise<ModerateVouchWithdrawalResponse> {
  const response = await apiFetch(
    `/api/v1/vouch-requests/${withdrawalRequestId}/moderate`,
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

    throw new Error(text || "Unable to moderate vouch withdrawal request.");
  }

  return response.json();
}
