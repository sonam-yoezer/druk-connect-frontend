import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReview } from "../api/submitReview";
import { SubmitReviewData } from "../types/reviews";

export function useSubmitReview(listingId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SubmitReviewData) => submitReview(listingId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", listingId],
      });
    },
  });
}
