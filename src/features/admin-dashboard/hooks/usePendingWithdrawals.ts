import { useQuery } from "@tanstack/react-query";

import { getPendingWithdrawals } from "../api/getPendingWithdrawals";

type UsePendingWithdrawalsParams = {
  page?: number;
  size?: number;
};

export function usePendingWithdrawals({
  page = 1,
  size = 10,
}: UsePendingWithdrawalsParams = {}) {
  return useQuery({
    queryKey: ["admin-pending-withdrawals", page, size],
    queryFn: () =>
      getPendingWithdrawals({
        page,
        size,
      }),
  });
}
