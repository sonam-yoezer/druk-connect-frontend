import { keepPreviousData, useQuery } from "@tanstack/react-query";

import type { SearchListingsParams } from "../types/listing";
import { searchListings } from "../api/searchListings";

export function useSearchListings(params: SearchListingsParams = {}) {
  return useQuery({
    queryKey: ["listings", "search", params],
    queryFn: () => searchListings(params),
    placeholderData: keepPreviousData,
    staleTime: 60_000, // cached results count as fresh for 1 minute
    refetchOnWindowFocus: false, // no refetch when switching browser tabs
  });
}
