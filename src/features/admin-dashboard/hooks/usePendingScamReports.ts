import { useQuery } from "@tanstack/react-query";
import { getPendingScamReports } from "../api/getPendingScamReports";

export function usePendingScamReports(page: number, size: number = 10) {
  return useQuery({
    queryKey: ["admin", "scam-reports", "PENDING", page, size],
    queryFn: () =>
      getPendingScamReports({
        status: "PENDING",
        page,
        size,
      }),
    staleTime: 30_000,
    retry: 1,
  });
}
