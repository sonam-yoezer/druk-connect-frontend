import { apiFetch } from "@/src/lib/api/client";
import type { FeedbackAnalytics } from "../types/feedbackAnalytics";

export async function getFeedbackAnalytics(): Promise<FeedbackAnalytics> {
  const response = await apiFetch("/api/v1/admin/feedback/dashboard", {
    method: "GET",
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to fetch feedback analytics (${response.status})`,
    );
  }

  return (await response.json()) as FeedbackAnalytics;
}
