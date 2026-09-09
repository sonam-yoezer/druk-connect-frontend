import { useQuery } from "@tanstack/react-query";
import type { VouchCountResponse } from "../types/vouches";
import { getVouchCount } from "../api/getVouchCount";

export function useVouchCount(userId: string | null) {
  const { data, isLoading, isFetching, error, refetch } = useQuery<
    VouchCountResponse,
    Error
  >({
    queryKey: ["vouch-count", userId],
    queryFn: () => getVouchCount(userId!),
    enabled: Boolean(userId),

    staleTime: 3 * 1000,

    refetchInterval: (query) => {
      if (query.state.data?.requirementMet) {
        return false;
      }

      return 3 * 1000;
    },

    retry: 1,
  });

  return {
    vouchCount: data,
    activeVouches: data?.activeVouches ?? 0,
    requiredVouches: data?.requiredVouches ?? 0,
    remainingVouches: data?.remainingVouches ?? 0,
    requirementMet: data?.requirementMet ?? false,
    isLoading,
    isFetching,
    error,
    refetch,
  };
}
