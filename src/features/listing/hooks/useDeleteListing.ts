import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "../api/deleteListing";

export function useDeleteListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteListing,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-listings"],
      });
    },
  });
}
