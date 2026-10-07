import { apiFetch } from "@/src/lib/api/client";
import type { PendingVouchWithdrawalsResponse } from "../types/vouchWithdrawal";

type GetPendingWithdrawalsParams = {
  page?: number;
  size?: number;
};

export async function getPendingWithdrawals({
  page = 1,
  size = 10,
}: GetPendingWithdrawalsParams = {}): Promise<PendingVouchWithdrawalsResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const response = await apiFetch(
    `/api/v1/vouch-requests/getPendingWithdrawals?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to load pending vouch withdrawals.");
  }

  return response.json();
}
