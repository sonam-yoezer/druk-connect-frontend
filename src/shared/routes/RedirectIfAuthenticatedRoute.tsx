"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/store/authStore";
import { getDashboardRoute } from "./getDashboardRoute";

import { reviewReturnPath } from "./reviewReturnPath";

interface RedirectIfAuthenticatedRouteProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export function RedirectIfAuthenticatedRoute({
  children,
  redirectTo,
}: RedirectIfAuthenticatedRouteProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated || !isAuthenticated || !user) {
      return;
    }

    router.replace(user.accessType === "BUYER" ? reviewReturnPath(redirectTo) || getDashboardRoute(user) : getDashboardRoute(user));
  }, [hydrated, isAuthenticated, user, router, redirectTo]);

  if (!hydrated || isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
