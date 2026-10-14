import { apiFetch } from "@/src/lib/api/client";

export type ReportScamRequest = {
  reason: string;
  details: string;
};

export type ReportScamResponse = {
  reportId: string;
  reportedListerUserId: string;
  reportedListerName: string;
  reporterUserId: string;
  sourceListingId: string;
  sourceListingTitle: string;
  reason: string;
  details: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reportedAt: string;
  moderatedAt: string | null;
  moderationReason: string | null;
  message: string;
};

export async function reportScam(
  listingId: string,
  data: ReportScamRequest,
): Promise<ReportScamResponse> {
  const response = await apiFetch(`/api/v1/listings/${listingId}/report-scam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to submit scam report.");
  }

  return response.json();
}
