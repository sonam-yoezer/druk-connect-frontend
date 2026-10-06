import { useVouchRecoveryStore } from "../store/vouchRecoveryStore";

export interface RecoveryStatus {
  userId: string;
  activeVouchCount: number;
  requiredVouchCount: number;
  vouchesNeeded: number;
  eligibleForLogin: boolean;
}

export interface RecoveryBuyers {
  buyers: { userId: string; firstName: string; lastName: string; email: string; phoneNumber?: string; accessType: string; alreadyVouched?: boolean; requestPending?: boolean }[];
  currentPage?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

async function recoveryFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { session, expiresAt, clear } = useVouchRecoveryStore.getState();
  if (!session?.vouchRecoveryToken || expiresAt <= Date.now()) {
    clear();
    throw new Error("Your recovery session has expired. Sign in again to continue.");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/vouch-recovery${path}`, {
    ...options,
    cache: "no-store",
    credentials: "omit",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.vouchRecoveryToken}` },
  });
  if (!response.ok) {
    if (response.status === 401) {
      clear();
      throw new Error("Your recovery session has expired. Sign in again to continue.");
    }
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || "Unable to complete vouch recovery request. Please try again.");
  }
  return response.json();
}

export const getRecoveryStatus = () => recoveryFetch<RecoveryStatus>("/me");
export const searchRecoveryBuyers = async (query: string, page: number, signal?: AbortSignal): Promise<RecoveryBuyers> => {
  const response = await recoveryFetch<unknown>(
    `/buyers/search?${new URLSearchParams({ query, page: String(page), size: "10" })}`,
    { signal },
  );
  // Current backend returns a plain list; retain support for the paged contract.
  if (Array.isArray(response)) return { buyers: response };
  if (response && typeof response === "object" && "buyers" in response && Array.isArray(response.buyers)) {
    return response as RecoveryBuyers;
  }
  throw new Error("Unable to read Buyer search results. Please try again.");
};
export const requestRecoveryVouch = (buyerUserId: string) =>
  recoveryFetch<{ status: string; message: string }>("/requests", { method: "POST", body: JSON.stringify({ buyerUserId }) });

export const inviteRecoveryBuyer = (email: string) =>
  recoveryFetch<{ status: string; message: string }>("/invitations", {
    method: "POST",
    body: JSON.stringify({ email: email.trim() }),
  });

export interface RecoveryVouchCount {
  userId: string;
  activeVouches: number;
  requiredVouches: number;
  remainingVouches: number;
  requirementMet: boolean;
}

export const getRecoveryVouchCount = (signal?: AbortSignal) =>
  recoveryFetch<RecoveryVouchCount>("/vouch-count", { signal });

export const getRecoveryRequestCount = (signal?: AbortSignal) =>
  recoveryFetch<{ pendingRequestCount: number }>("/request-count", { signal });
