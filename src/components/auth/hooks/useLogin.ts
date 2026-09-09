import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { LoginRequest, LoginResponse } from "../types/login";
import { AuthApiError } from "../types/AuthApiError";

export function useLogin() {
  return useMutation<LoginResponse, AuthApiError, LoginRequest>({
    mutationFn: login,
  });
}
