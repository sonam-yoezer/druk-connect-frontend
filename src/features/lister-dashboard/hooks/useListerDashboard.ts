import { useQuery } from "@tanstack/react-query";
import { getListerDashboard } from "../api/getListerDashboard";

export function useListerDashboard() {
  return useQuery({
    queryKey: ["lister-dashboard"],
    queryFn: getListerDashboard,
  });
}
