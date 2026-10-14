import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitAppeal } from "../api/submitAppeal";

export function useSubmitAppeal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAppeal,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["lister-restrictions", "me"],
      });
    },
  });
}
