import type { ListingsResponse, SearchListingsParams } from "../types/listing";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function searchListings(
  params: SearchListingsParams = {},
): Promise<ListingsResponse> {
  const searchParams = new URLSearchParams();

  searchParams.set("page", String(params.page ?? 1));
  searchParams.set("size", String(params.size ?? 10));

  if (params.category) {
    searchParams.set("category", params.category);
  }

  if (params.city) {
    searchParams.set("city", params.city);
  }

  if (params.q) {
    searchParams.set("q", params.q);
  }

  const res = await fetch(
    `${BACKEND_URL}/api/v1/listings/search?${searchParams.toString()}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to search listings");
  }

  return res.json();
}
