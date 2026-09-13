"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  LayoutDashboard,
  Settings,
  Store,
  UserRound,
  Users,
} from "lucide-react";

const NAVIGATION = [
  {
    label: "Dashboard",
    href: "/lister-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Listings",
    href: "/lister-dashboard/listings",
    icon: Store,
  },
  {
    label: "Requests",
    href: "/lister-dashboard/requests",
    icon: Bell,
  },
  {
    label: "Insights",
    href: "/lister-dashboard/insights",
    icon: BarChart3,
  },
  {
    label: "Vouches",
    href: "/lister-dashboard/vouches",
    icon: Users,
  },
];

const SECONDARY_NAVIGATION = [
  {
    label: "Profile",
    href: "/lister-dashboard/profile",
    icon: UserRound,
  },
  {
    label: "Settings",
    href: "/lister-dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-line bg-surface lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b border-line px-6">
        <Link
          href="/lister-dashboard"
          className="flex items-center gap-2.5"
          aria-label="DrukConnect dashboard"
        >
          <LogoMark />

          <span className="font-serif text-xl font-medium tracking-tight text-ink">
            DrukConnect
          </span>
        </Link>
      </div>

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

        <div className="mt-auto border-t border-line pt-5">
          <div className="flex items-center gap-3 px-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm font-semibold text-brand">
              T
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                Tashi Wangchuk
              </p>

              <p className="text-xs text-muted">Lister</p>
            </div>
          </div>
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
  if (href === "/lister-dashboard") {
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
