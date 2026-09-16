import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListing, type UpdateListingData } from "../api/updateListing";

export function useUpdateListing() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      listingId,
      data,
    }: {
      listingId: string;
      data: UpdateListingData;
    }) => updateListing(listingId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-listings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["listing", variables.listingId],
      });
    },
  });
}
