import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moderateAppeal } from "../api/moderateAppeal";

export function useModerateAppeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appealId,
      action,
      reason,
    }: {
      appealId: string;
      action: "APPROVE" | "REJECT";
      reason: string;
    }) =>
      moderateAppeal(appealId, {
        action,
        reason,
      }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["admin-appeals", "pending"],
      });
    },
  });
}
