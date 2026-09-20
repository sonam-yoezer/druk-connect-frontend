import type { LoginUser } from "@/src/components/auth/types/login";

export function getDashboardRoute(user: LoginUser): string {
  if (user.roles?.includes("ADMIN")) {
    return "/admin-dashboard";
  }

  if (user.accessType === "LISTER") {
    return "/lister-dashboard";
  }

  return "/buyer-dashboard";
}
