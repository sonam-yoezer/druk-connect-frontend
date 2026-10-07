"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  Settings,
  UserRound,
  Users,
} from "lucide-react";
import { useAuthStore } from "../../auth/store/authStore";

const NAVIGATION = [
  {
    label: "Dashboard",
    href: "/buyer-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Browse Services",
    href: "/buyer-dashboard/services",
    icon: Search,
  },
  // {
  //   label: "Messages",
  //   href: "/buyer-dashboard/messages",
  //   icon: MessageCircle,
  // },
  {
    label: "My Requests",
    href: "/buyer-dashboard/requests",
    icon: Users,
  },
];

const SECONDARY_NAVIGATION = [
  {
    label: "Profile",
    href: "/buyer-dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/buyer-dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const clearSession = useAuthStore((state) => state.clearSession);

  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    clearSession();
    router.replace("/");
  };

  const userName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "User";

  const userInitial = user?.firstName?.charAt(0).toUpperCase() || "U";

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-surface lg:flex lg:flex-col">
      {/* Header */}
      <div className="flex h-16 items-center border-b border-line px-6">
        <Link
          href="/buyer-dashboard"
          className="flex items-center gap-2.5"
          aria-label="DrukConnect dashboard"
        >
          <LogoMark />

          <span className="font-serif text-xl font-medium tracking-tight text-ink">
            DrukConnect
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex flex-1 flex-col px-4 py-6">
        <nav className="space-y-1">
          {NAVIGATION.map((item) => (
            <DashboardNavItem
              key={item.href}
              {...item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="my-6 border-t border-line" />

        <nav className="space-y-1">
          {SECONDARY_NAVIGATION.map((item) => (
            <DashboardNavItem
              key={item.href}
              {...item}
              active={isActivePath(pathname, item.href)}
            />
          ))}
        </nav>

        {/* User */}
        <div className="mt-auto border-t border-line pt-5">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm font-semibold text-brand">
              {userInitial}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {userName}
              </p>

              <p className="text-xs text-muted">Buyer</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function DashboardNavItem({
  label,
  href,
  icon: Icon,
  active,
}: {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
        active
          ? "bg-brand-tint text-brand"
          : "text-muted hover:bg-background hover:text-ink"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/buyer-dashboard") {
    return pathname === href;
  }

  return pathname.startsWith(`${href}/`) || pathname === href;
}

function LogoMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2L25 22H3L14 2Z"
        className="stroke-brand"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path d="M14 10L19 19H9L14 10Z" className="fill-brand" />
    </svg>
  );
}
