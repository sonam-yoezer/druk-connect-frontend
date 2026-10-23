import { useQuery } from "@tanstack/react-query";
import { getBuyerDashboard } from "../api/getBuyerDashboard";

export function useBuyerDashboard() {
  return useQuery({
    queryKey: ["buyer-dashboard"],
    queryFn: getBuyerDashboard,
  });
}
