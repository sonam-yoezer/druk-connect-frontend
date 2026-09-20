import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ModerateReviewData } from "../../reviews/types/reviews";
import { moderateReview } from "../api/moderateReview";

export function useModerateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      reviewId,
      data,
    }: {
      reviewId: string;
      data: ModerateReviewData;
    }) => moderateReview(reviewId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-reviews"],
      });
    },
  });
}
