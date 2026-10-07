import { useMutation } from "@tanstack/react-query";

import { createListing } from "../api/createListing";
import type { CreateListingData } from "../types/listing";
import { useAuthStore } from "../../auth/store/authStore";

export function useCreateListing() {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useMutation({
    mutationFn: ({
      data,
      images,
    }: {
      data: CreateListingData;
      images: File[];
    }) => {
      if (!accessToken) {
        throw new Error("You must be signed in to create a listing.");
      }

      return createListing(data, images, accessToken);
    },
  });
}
