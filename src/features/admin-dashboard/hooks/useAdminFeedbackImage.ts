import { useQuery } from "@tanstack/react-query";
import { getAdminFeedbackImage } from "../api/getAdminFeedbackImage";

export function useAdminFeedbackImage(feedbackId: string, enabled: boolean) {
  return useQuery({
    queryKey: ["admin-feedback-image", feedbackId],
    queryFn: () => getAdminFeedbackImage(feedbackId),
    enabled,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
