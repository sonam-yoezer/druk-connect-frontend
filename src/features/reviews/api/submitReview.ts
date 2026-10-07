import { apiFetch } from "@/src/lib/api/client";
import { SubmitReviewData, SubmitReviewResponse } from "../types/reviews";

export async function submitReview(
  listingId: string,
  data: SubmitReviewData,
): Promise<SubmitReviewResponse> {
  const response = await apiFetch(`/api/v1/listings/${listingId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to submit review");
  }

  return response.json();
}
