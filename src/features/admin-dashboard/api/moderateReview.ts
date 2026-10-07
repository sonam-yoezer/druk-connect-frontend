import { apiFetch } from "@/src/lib/api/client";
import {
  ModerateReviewData,
  ReviewModerationResponse,
} from "../../reviews/types/reviews";

export async function moderateReview(
  reviewId: string,
  data: ModerateReviewData,
): Promise<ReviewModerationResponse> {
  const response = await apiFetch(
    `/api/v1/admin/reviews/${reviewId}/approveOrReject`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Failed to moderate review");
  }

  return response.json();
}
