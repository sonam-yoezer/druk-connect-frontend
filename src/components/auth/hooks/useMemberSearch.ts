import { useQuery } from "@tanstack/react-query";
import type { VouchUserSearchResponse } from "../types/vouches";
import { searchVouchUsers } from "../api/searchVouchUsers";

export function useMemberSearch(userId: string | null, query: string) {
  const normalizedQuery = query.trim();

  const queryResult = useQuery<VouchUserSearchResponse[], Error>({
    queryKey: ["vouch-user-search", userId, normalizedQuery],
    queryFn: () => searchVouchUsers(userId!, normalizedQuery),
    enabled: Boolean(userId) && normalizedQuery.length >= 2,
    staleTime: 30 * 1000,
    retry: 1,
  });

  return {
    results: queryResult.data ?? [],
    isLoading: queryResult.isLoading,
    isFetching: queryResult.isFetching,
    error: queryResult.error,
  };
}
