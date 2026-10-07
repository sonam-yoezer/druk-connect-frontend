import { useMutation } from "@tanstack/react-query";

import { moderateVouchWithdrawal } from "../api/moderateVouchWithdrawal";

export function useModerateVouchWithdrawal() {
  return useMutation({
    mutationFn: ({
      withdrawalRequestId,
      action,
      reason,
    }: {
      withdrawalRequestId: string;
      action: "APPROVE" | "REJECT";
      reason: string;
    }) =>
      moderateVouchWithdrawal(withdrawalRequestId, {
        action,
        reason,
      }),
  });
}
