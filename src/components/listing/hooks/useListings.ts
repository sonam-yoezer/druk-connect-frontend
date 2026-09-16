import { useQuery } from "@tanstack/react-query";

import { getListings } from "../api/getListings";

export function useListings(page = 1, size = 10) {
  return useQuery({
    queryKey: ["listings", page, size],
    queryFn: () => getListings(page, size),
  });
}
