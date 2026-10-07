import { useQuery } from "@tanstack/react-query";
import { getAdminReviews, GetAdminReviewsParams } from "../api/getAdminReviews";

export function useAdminReviews(params: GetAdminReviewsParams = {}) {
  const page = params.page ?? 1;
  const size = params.size ?? 10;

  return useQuery({
    queryKey: ["admin-reviews", page, size],
    queryFn: () =>
      getAdminReviews({
        page,
        size,
      }),
  });
}
