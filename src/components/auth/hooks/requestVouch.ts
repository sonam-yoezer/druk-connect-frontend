import { CreateVouchRequestPayload } from "../types/vouches";

export async function requestVouch(
  requesterUserId: string,
  payload: CreateVouchRequestPayload,
): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/vouch-requests/users/${requesterUserId}/requests`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const text = await res.text();

    throw new Error(text || "Failed to request vouch");
  }
}
