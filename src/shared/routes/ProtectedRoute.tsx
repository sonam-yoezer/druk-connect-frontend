"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/features/auth/store/authStore";

type UserRole = "ADMIN" | "ENDUSER";
type AccessType = "BUYER" | "LISTER";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  allowedAccessTypes?: AccessType[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
  allowedAccessTypes,
}: ProtectedRouteProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hydrated = useAuthStore((state) => state.hydrated);

  const userRoles = user?.roles ?? [];
  const userAccessType = user?.accessType;

  const hasRoleAccess =
    !allowedRoles || allowedRoles.some((role) => userRoles.includes(role));

  const hasAccessTypeAccess =
    !allowedAccessTypes ||
    (userAccessType ? allowedAccessTypes.includes(userAccessType) : false);

  const hasAccess = hasRoleAccess && hasAccessTypeAccess;

  useEffect(() => {
    if (!hydrated) return;

    if (!isAuthenticated || !user) {
      router.replace("/auth/login");
      return;
    }

    if (!hasAccess) {
      if (userRoles.includes("ADMIN")) {
        router.replace("/admin-dashboard");
      } else if (user.accessType === "LISTER") {
        router.replace("/lister-dashboard");
      } else {
        router.replace("/buyer-dashboard");
      }
    }
  }, [hydrated, isAuthenticated, user, hasAccess, userRoles, router]);

  if (!hydrated || !isAuthenticated || !user || !hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-brand" />
      </div>
    );
  }

  return <>{children}</>;
}
