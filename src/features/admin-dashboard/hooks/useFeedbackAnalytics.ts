import { useQuery } from "@tanstack/react-query";
import { getFeedbackAnalytics } from "../api/getFeedbackAnalytics";

export function useFeedbackAnalytics() {
  return useQuery({
    queryKey: ["admin-feedback-analytics"],
    queryFn: getFeedbackAnalytics,
  });
}
