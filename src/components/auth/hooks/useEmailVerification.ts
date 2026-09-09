import { useMutation } from "@tanstack/react-query";
import type { VerifyOtpRequest } from "../types/signup";
import { verifyOtp } from "../api/emailVerification";

export function useEmailVerification() {
  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => verifyOtp(data),
  });
}
