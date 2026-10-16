import { apiFetch } from "@/src/lib/api/client";
import type { AdminFeedbackResponse } from "../types/adminFeedback";

type GetAdminFeedbackParams = {
  page?: number;
  size?: number;
};

export async function getAdminFeedback({
  page = 1,
  size = 20,
}: GetAdminFeedbackParams = {}): Promise<AdminFeedbackResponse> {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const response = await apiFetch(
    `/api/v1/admin/feedback?${params.toString()}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(message || `Failed to fetch feedback (${response.status})`);
  }

  return (await response.json()) as AdminFeedbackResponse;
}
