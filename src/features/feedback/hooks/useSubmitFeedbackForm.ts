import { useMutation } from "@tanstack/react-query";
import { submitFeedbackForm } from "../api/submitFeedbackForm";
import type { SubmitFeedbackRequest } from "../types/feedback";
import { useAuthStore } from "../../auth/store/authStore";

type SubmitFeedbackVariables = {
  data: SubmitFeedbackRequest;
  screenshot?: File;
};

export function useSubmitFeedbackForm() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationFn: ({ data, screenshot }: SubmitFeedbackVariables) => {
      if (!accessToken) {
        throw new Error("You must be signed in to submit feedback.");
      }

      return submitFeedbackForm(data, screenshot);
    },
  });
}
