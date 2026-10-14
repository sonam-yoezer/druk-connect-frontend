import { apiFetch } from "@/src/lib/api/client";
import type { PendingAppealsResponse } from "../types/adminAppeal";

interface GetPendingAppealsParams {
  page?: number;
  size?: number;
}

export async function getPendingAppeals({
  page = 1,
  size = 10,
}: GetPendingAppealsParams = {}): Promise<PendingAppealsResponse> {
  const params = new URLSearchParams({
    status: "PENDING",
    page: String(page),
    size: String(size),
  });

  const response = await apiFetch(
    `/api/v1/admin/lister-scam/appeals?${params.toString()}`,
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to fetch pending appeals (${response.status})`,
    );
  }

  return (await response.json()) as PendingAppealsResponse;
}
