import { useMutation } from "@tanstack/react-query";

import type { InviteUserRequest } from "../types/vouches";
import { inviteUserByEmail } from "../api/inviteUserByEmail";

export function useInviteUser() {
  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: InviteUserRequest;
    }) => inviteUserByEmail(userId, data),
  });
}
