import { apiFetch } from "@/src/lib/api/client";
import { CreateListingData, CreateListingResponse } from "../types/listing";

export async function createListing(
  data: CreateListingData,
  images: File[],
): Promise<CreateListingResponse> {
  const formData = new FormData();

  formData.append("data", JSON.stringify(data));

  images.forEach((image) => {
    formData.append("images", image);
  });

  const res = await apiFetch("/api/v1/listings", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();

    throw new Error(text || "Failed to create listing");
  }

  return res.json();
}
