import { useQuery } from "@tanstack/react-query";

import { getListingById } from "../api/getListingById";

export function useListing(listingId: string) {
  return useQuery({
    queryKey: ["listing", listingId],
    queryFn: () => getListingById(listingId),
    enabled: Boolean(listingId),
  });
}
