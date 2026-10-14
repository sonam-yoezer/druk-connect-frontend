import { apiFetch } from "@/src/lib/api/client";
import type {
  ModerateAppealRequest,
  ModerateAppealResponse,
} from "../types/adminAppeal";

export async function moderateAppeal(
  appealId: string,
  data: ModerateAppealRequest,
): Promise<ModerateAppealResponse> {
  const response = await apiFetch(
    `/api/v1/admin/lister-scam/appeals/${encodeURIComponent(appealId)}/moderate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(
      message || `Failed to moderate appeal (${response.status})`,
    );
  }

  return (await response.json()) as ModerateAppealResponse;
}
