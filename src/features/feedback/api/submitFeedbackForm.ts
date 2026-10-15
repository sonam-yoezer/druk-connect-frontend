import { apiFetch } from "@/src/lib/api/client";
import type {
  SubmitFeedbackRequest,
  SubmitFeedbackResponse,
} from "../types/feedback";

export async function submitFeedbackForm(
  data: SubmitFeedbackRequest,
  screenshot?: File,
): Promise<SubmitFeedbackResponse> {
  const formData = new FormData();

  formData.append("request", JSON.stringify(data));

  if (screenshot) {
    formData.append("screenshot", screenshot);
  }

  const response = await apiFetch("/api/v1/feedback/form", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to submit feedback (${response.status})`,
    );
  }

  return (await response.json()) as SubmitFeedbackResponse;
}
