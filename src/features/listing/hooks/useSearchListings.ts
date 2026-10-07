import { useQuery } from "@tanstack/react-query";

import type { SearchListingsParams } from "../types/listing";
import { searchListings } from "../api/searchListings";

export function useSearchListings(params: SearchListingsParams = {}) {
  return useQuery({
    queryKey: ["listings", "search", params],
    queryFn: () => searchListings(params),
  });
}
