import type { VouchCountResponse } from "../types/vouches";

export async function getVouchCount(
  userId: string,
): Promise<VouchCountResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/vouch-requests/users/${userId}/vouch-count`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  if (!res.ok) {
    const text = await res.text();

    throw new Error(text || "Failed to fetch vouch count");
  }

  return res.json();
}
