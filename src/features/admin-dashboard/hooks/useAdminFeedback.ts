import { useQuery } from "@tanstack/react-query";
import { getAdminFeedback } from "../api/getAdminFeedback";

export function useAdminFeedback(page: number, size = 20) {
  return useQuery({
    queryKey: ["admin-feedback", page, size],
    queryFn: () => getAdminFeedback({ page, size }),
  });
}
