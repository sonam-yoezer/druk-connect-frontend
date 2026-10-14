import { useMutation } from "@tanstack/react-query";
import { reportScam } from "../api/reportScam";
import { useAuthStore } from "../../auth/store/authStore";

export function useReportScam() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationFn: ({
      listingId,
      reason,
      details,
    }: {
      listingId: string;
      reason: string;
      details: string;
    }) => {
      if (!accessToken) {
        throw new Error("You must be signed in to report a scam.");
      }

      return reportScam(listingId, {
        reason,
        details,
      });
    },
  });
}
