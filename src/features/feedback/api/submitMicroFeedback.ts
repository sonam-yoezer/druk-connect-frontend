import { apiFetch } from "@/src/lib/api/client";
import type {
  SubmitMicroFeedbackRequest,
  SubmitMicroFeedbackResponse,
} from "../types/microFeedback";

export async function submitMicroFeedback(
  data: SubmitMicroFeedbackRequest,
): Promise<SubmitMicroFeedbackResponse> {
  const response = await apiFetch("/api/v1/feedback/micro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to submit feedback (${response.status})`,
    );
  }

  return (await response.json()) as SubmitMicroFeedbackResponse;
}
