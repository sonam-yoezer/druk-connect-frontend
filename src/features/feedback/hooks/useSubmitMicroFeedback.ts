import { useMutation } from "@tanstack/react-query";
import { submitMicroFeedback } from "../api/submitMicroFeedback";

export function useSubmitMicroFeedback() {
  return useMutation({
    mutationFn: submitMicroFeedback,
  });
}
