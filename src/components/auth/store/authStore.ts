"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginUser } from "../types/login";

interface AuthState {
  user: LoginUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setSession: (user: LoginUser, accessToken: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setSession: (user, accessToken) =>
        set({
          user,
          accessToken,
          isAuthenticated: true,
        }),

      clearSession: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "drukconnect-auth",
    },
  ),
);
