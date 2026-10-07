import { InviteUserRequest, InviteUserResponse } from "../types/vouches";

export async function inviteUserByEmail(
  userId: string,
  data: InviteUserRequest,
): Promise<InviteUserResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/vouch-requests/users/${userId}/invitations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to send invitation");
  }

  return res.json();
}
