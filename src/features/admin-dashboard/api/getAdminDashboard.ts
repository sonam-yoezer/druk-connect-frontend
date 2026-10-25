import { apiFetch } from "@/src/lib/api/client";
import { AdminDashboardResponse } from "../types/admin-dashboard";

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await apiFetch("/api/v1/admin/dashboard", {
    method: "GET",
  });

  if (!response.ok) {
    const text = await response.text();

    throw new Error(text || "Unable to load admin dashboard analytics.");
  }

  return response.json();
}
