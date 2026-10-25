import { apiFetch } from "@/src/lib/api/client";
import { ListerDashboardResponse } from "../types/isterDashboard";

export async function getListerDashboard(): Promise<ListerDashboardResponse> {
  const response = await apiFetch("/api/v1/lister/dashboard", {
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to load lister dashboard analytics.");
  }

  return response.json();
}
