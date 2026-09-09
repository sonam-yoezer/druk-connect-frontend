import { useMutation } from "@tanstack/react-query";
import { SignupRequest, SignupResponse } from "../types/signup";
import { signup } from "../api/signUp";
import { AuthApiError } from "../types/AuthApiError";

export function useSignup() {
  return useMutation<SignupResponse, AuthApiError, SignupRequest>({
    mutationFn: (data: SignupRequest) => signup(data),
  });
}
