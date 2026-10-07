import { useQuery } from "@tanstack/react-query";
import { getMyListings } from "../api/getMyListings";

export function useMyListings() {
  return useQuery({
    queryKey: ["my-listings"],
    queryFn: getMyListings,
  });
}
