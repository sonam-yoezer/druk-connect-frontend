import { apiFetch } from "@/src/lib/api/client";
import type {
  GetScamReportsParams,
  ScamReportsResponse,
} from "../types/scamReport";

export async function getPendingScamReports({
  page,
  size,
  status = "PENDING",
}: GetScamReportsParams): Promise<ScamReportsResponse> {
  const params = new URLSearchParams({
    status,
    page: String(page),
    size: String(size),
  });

  const response = await apiFetch(
    `/api/v1/admin/lister-scam/reports?${params.toString()}`,
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to fetch scam reports (${response.status})`,
    );
  }

  return (await response.json()) as ScamReportsResponse;
}
