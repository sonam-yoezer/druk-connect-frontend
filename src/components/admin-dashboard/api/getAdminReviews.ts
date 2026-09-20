import { apiFetch } from "@/src/lib/api/client";
import { AdminReviewsResponse } from "../../reviews/types/reviews";

export interface GetAdminReviewsParams {
  page?: number;
  size?: number;
}

export async function getAdminReviews(
  params: GetAdminReviewsParams = {},
): Promise<AdminReviewsResponse> {
  const page = params.page ?? 1;
  const size = params.size ?? 10;

  const response = await apiFetch(
    `/api/v1/admin/reviews?page=${page}&size=${size}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Failed to fetch admin reviews");
  }

  return response.json();
}
