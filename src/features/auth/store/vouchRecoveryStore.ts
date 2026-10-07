"use client";

import { create } from "zustand";
import type { LoginResponse } from "../types/login";

type RecoveryLogin = Extract<LoginResponse, { loginStatus: "VOUCH_REQUIRED" }>;

// Deliberately memory-only: never put a recovery JWT in the persisted auth session.
export const useVouchRecoveryStore = create<{
  session: RecoveryLogin | null;
  expiresAt: number;
  completionNotice: boolean;
  complete: () => void;
  dismissCompletionNotice: () => void;
  pendingBuyerIds: string[];
  start: (session: RecoveryLogin) => void;
  markPending: (buyerId: string) => void;
  clear: () => void;
}>((set) => ({
  session: null,
  expiresAt: 0,
  completionNotice: false,
  complete: () => set({ session: null, expiresAt: 0, pendingBuyerIds: [], completionNotice: true }),
  dismissCompletionNotice: () => set({ completionNotice: false }),
  pendingBuyerIds: [],
  start: (session) => set({ session, completionNotice: false, expiresAt: Date.now() + session.vouchRecoveryTokenExpiresIn * 1000, pendingBuyerIds: [] }),
  markPending: (buyerId) => set((state) => ({ pendingBuyerIds: [...new Set([...state.pendingBuyerIds, buyerId])] })),
  clear: () => set({ session: null, expiresAt: 0, pendingBuyerIds: [] }),
}));
