"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/components/auth/store/authStore";
import { getDashboardRoute } from "./getDashboardRoute";

interface RedirectIfAuthenticatedRouteProps {
  children: React.ReactNode;
}

export function RedirectIfAuthenticatedRoute({
  children,
}: RedirectIfAuthenticatedRouteProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrated = useAuthStore((state) => state.hydrated);

  useEffect(() => {
    if (!hydrated || !isAuthenticated || !user) {
      return;
    }

    router.replace(getDashboardRoute(user));
  }, [hydrated, isAuthenticated, user, router]);

  if (!hydrated || isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
