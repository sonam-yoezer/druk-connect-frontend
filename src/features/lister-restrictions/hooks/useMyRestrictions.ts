import { useQuery } from "@tanstack/react-query";
import { getMyRestrictions } from "../api/getMyRestrictions";

export function useMyRestrictions() {
  return useQuery({
    queryKey: ["lister-restrictions", "me"],
    queryFn: getMyRestrictions,
    staleTime: 30_000,
    retry: 1,
  });
}
