import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moderateScamReport } from "../api/moderateScamReport";
import type { ModerateScamReportRequest } from "../types/scamReport";

interface ModerateScamReportVariables {
  reportId: string;
  payload: ModerateScamReportRequest;
}

export function useModerateScamReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reportId, payload }: ModerateScamReportVariables) =>
      moderateScamReport(reportId, payload),

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["admin", "scam-reports", "PENDING"],
      }),
  });
}
