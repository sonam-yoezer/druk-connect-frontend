import { useQuery } from "@tanstack/react-query";

import { getIncomingVouchRequests } from "../api/vouchRequests";

export function useIncomingVouchRequests() {
  return useQuery({
    queryKey: ["incoming-vouch-requests"],
    queryFn: getIncomingVouchRequests,
  });
}
