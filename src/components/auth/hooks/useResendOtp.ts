import { useMutation } from "@tanstack/react-query";

import {
  resendOtp,
} from "./resendOtp";

import type {
  ResendOtpPayload,
  ResendOtpResponse,
} from "../types/requestotp";

export function useResendOtp() {
  const mutation = useMutation<
    ResendOtpResponse,
    Error,
    ResendOtpPayload
  >({
    mutationFn: (payload) =>
      resendOtp(payload),
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    reset: mutation.reset,
  };
}