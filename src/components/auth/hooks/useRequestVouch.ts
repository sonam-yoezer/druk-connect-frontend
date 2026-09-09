import { useMutation } from "@tanstack/react-query";
import type { CreateVouchRequestPayload } from "../types/vouches";
import { requestVouch } from "./requestVouch";

export function useRequestVouch() {
  const mutation = useMutation<
    void,
    Error,
    {
      requesterUserId: string;
      payload: CreateVouchRequestPayload;
    }
  >({
    mutationFn: ({ requesterUserId, payload }) =>
      requestVouch(requesterUserId, payload),
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
}
