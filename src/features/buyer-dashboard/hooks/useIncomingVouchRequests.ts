import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getIncomingVouchRequests } from "../api/vouchRequests";

export function useIncomingVouchRequests() {
  return useQuery({
    queryKey: ["incoming-vouch-requests"],
    queryFn: getIncomingVouchRequests,
    placeholderData: keepPreviousData,
    staleTime: 60_000, // cached results count as fresh for 1 minute
    refetchOnWindowFocus: false, // no refetch when switching browser tabs
  });
}
