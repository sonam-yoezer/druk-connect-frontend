import { apiFetch } from "@/src/lib/api/client";
import type { AdminFeedbackItem } from "../types/adminFeedback";

export type AdminFeedbackStatus = "NEW" | "IN_PROGRESS" | "RESOLVED";

type UpdateAdminFeedbackStatusParams = {
  feedbackId: string;
  status: AdminFeedbackStatus;
};

export async function updateAdminFeedbackStatus({
  feedbackId,
  status,
}: UpdateAdminFeedbackStatusParams): Promise<AdminFeedbackItem> {
  const response = await apiFetch(
    `/api/v1/admin/feedback/${encodeURIComponent(feedbackId)}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    },
  );

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to update feedback status (${response.status})`,
    );
  }

  return (await response.json()) as AdminFeedbackItem;
}
