import { apiFetch } from "@/src/lib/api/client";
import type { BuyerDashboardResponse } from "../types/buyerDashboard";

export async function getBuyerDashboard(): Promise<BuyerDashboardResponse> {
  const response = await apiFetch("/api/v1/buyer/dashboard", {
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to load buyer dashboard analytics.");
  }

  return response.json();
}
