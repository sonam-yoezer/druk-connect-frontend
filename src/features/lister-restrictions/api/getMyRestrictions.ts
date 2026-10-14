import { apiFetch } from "@/src/lib/api/client";
import type { ListerRestriction } from "../types/listerRestriction";

export async function getMyRestrictions(): Promise<ListerRestriction> {
  const response = await apiFetch("/api/v1/lister-restrictions/me");

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      message || `Failed to fetch account restrictions (${response.status})`,
    );
  }

  return (await response.json()) as ListerRestriction;
}
