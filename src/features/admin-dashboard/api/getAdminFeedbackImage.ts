import { apiFetch } from "@/src/lib/api/client";

export async function getAdminFeedbackImage(feedbackId: string): Promise<Blob> {
  const response = await apiFetch(
    `/api/v1/admin/feedback/${encodeURIComponent(feedbackId)}/image`,
    { method: "GET" },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      message || `Failed to fetch screenshot (${response.status})`,
    );
  }

  return response.blob();
}
