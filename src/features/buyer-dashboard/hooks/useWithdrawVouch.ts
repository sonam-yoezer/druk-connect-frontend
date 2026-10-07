import { useMutation } from "@tanstack/react-query";
import { withdrawVouch } from "../api/withdrawVouch";

export function useWithdrawVouch() {
  return useMutation({
    mutationFn: ({ vouchId, reason }: { vouchId: string; reason: string }) =>
      withdrawVouch(vouchId, { reason }),
  });
}
