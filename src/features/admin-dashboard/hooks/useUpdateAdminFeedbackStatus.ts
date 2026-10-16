import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminFeedbackStatus } from "../api/updateAdminFeedbackStatus";
import type { AdminFeedbackStatus } from "../api/updateAdminFeedbackStatus";

type UpdateStatusVariables = {
  feedbackId: string;
  status: AdminFeedbackStatus;
};

export function useUpdateAdminFeedbackStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateStatusVariables) =>
      updateAdminFeedbackStatus(variables),

    onSuccess: (updatedFeedback) => {
      queryClient.setQueriesData(
        { queryKey: ["admin-feedback"] },
        (cachedData: unknown) => {
          if (
            !cachedData ||
            typeof cachedData !== "object" ||
            !("feedback" in cachedData) ||
            !Array.isArray(cachedData.feedback)
          ) {
            return cachedData;
          }

          return {
            ...cachedData,
            feedback: cachedData.feedback.map((item) =>
              item.feedbackId === updatedFeedback.feedbackId
                ? updatedFeedback
                : item,
            ),
          };
        },
      );

      queryClient.invalidateQueries({
        queryKey: ["admin-feedback"],
      });
    },
  });
}
