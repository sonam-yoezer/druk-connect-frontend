import { apiFetch } from "@/src/lib/api/client";
import type { GivenVouchesResponse } from "../types/vouchRequest";

export async function getGivenVouches(): Promise<GivenVouchesResponse> {
  const response = await apiFetch("/api/v1/vouch-requests/me/given-vouches", {
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to load your given vouches.");
  }

  return response.json();
}
