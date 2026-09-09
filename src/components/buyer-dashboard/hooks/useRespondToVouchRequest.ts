import { useMutation, useQueryClient } from "@tanstack/react-query";
import { respondToVouchRequest } from "../api/respondToVouchRequest";

export function useRespondToVouchRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      accept,
    }: {
      requestId: string;
      accept: boolean;
    }) => respondToVouchRequest(requestId, accept),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["incoming-vouch-requests"],
      });
    },
  });
}
