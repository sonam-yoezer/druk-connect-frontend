"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginResponse, LoginUser } from "../types/login";

interface AuthState {
  user: LoginUser | null;

  accessToken: string | null;
  refreshToken: string | null;

  accessTokenExpiresAt: string | null;
  refreshTokenExpiresAt: string | null;

  isAuthenticated: boolean;
  hydrated: boolean;

  setSession: (session: LoginResponse) => void;
  clearSession: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      accessToken: null,
      refreshToken: null,

      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,

      isAuthenticated: false,
      hydrated: false,

      setSession: (session) =>
        set({
          user: session.user,
          accessToken: session.accessToken,
          refreshToken: session.refreshToken,
          accessTokenExpiresAt: session.accessTokenExpiresAt,
          refreshTokenExpiresAt: session.refreshTokenExpiresAt,
          isAuthenticated: true,
        }),

      clearSession: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          refreshTokenExpiresAt: null,
          isAuthenticated: false,
        }),

      setHydrated: (hydrated) => set({ hydrated }),
    }),
    {
      name: "drukconnect-auth",

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
