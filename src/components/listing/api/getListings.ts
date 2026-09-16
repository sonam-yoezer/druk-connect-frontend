import type { ListingsResponse } from "../types/listing";

export async function getListings(
  page = 1,
  size = 10,
): Promise<ListingsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/listings?page=${page}&size=${size}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    const text = await res.text();

    throw new Error(text || "Failed to fetch listings");
  }

  return res.json();
}
