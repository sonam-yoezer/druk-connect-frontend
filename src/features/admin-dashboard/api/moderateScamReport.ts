import { apiFetch } from "@/src/lib/api/client";
import type {
  ModerateScamReportRequest,
  ModerateScamReportResponse,
} from "../types/scamReport";

export async function moderateScamReport(
  reportId: string,
  payload: ModerateScamReportRequest,
): Promise<ModerateScamReportResponse> {
  const response = await apiFetch(
    `/api/v1/admin/lister-scam/reports/${encodeURIComponent(reportId)}/moderate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to moderate report (${response.status})`,
    );
  }

  return (await response.json()) as ModerateScamReportResponse;
}
