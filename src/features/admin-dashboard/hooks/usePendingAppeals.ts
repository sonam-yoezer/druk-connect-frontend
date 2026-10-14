import { useQuery } from "@tanstack/react-query";
import { getPendingAppeals } from "../api/getPendingAppeals";

export function usePendingAppeals(page: number, size = 10) {
  return useQuery({
    queryKey: ["admin-appeals", "pending", page, size],
    queryFn: () => getPendingAppeals({ page, size }),
    staleTime: 30_000,
    retry: 1,
  });
}
