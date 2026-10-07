import { useQuery } from "@tanstack/react-query";
import { getGivenVouches } from "../api/getGivenVouches";

export function useGivenVouches() {
  return useQuery({
    queryKey: ["given-vouches"],
    queryFn: getGivenVouches,
  });
}
