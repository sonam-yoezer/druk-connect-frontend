"use client";

import Link from "next/link";
import {
  Bookmark,
  Compass,
  Home,
  LogOut,
  MessageCircle,
  Send,
  Settings,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "../../auth/ui/Primitives";
import { useAuthStore } from "../../auth/store/authStore";

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/buyer/dashboard",
    icon: Home,
  },
  {
    label: "Discover",
    href: "/dashboard/discover",
    icon: Compass,
  },
  {
    label: "Saved",
    href: "/dashboard/saved",
    icon: Bookmark,
  },
  {
    label: "Requests",
    href: "/buyer/dashboard/requests",
    icon: Send,
  },
  {
    label: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    router.replace("/");
  };

  return (
    <aside className="hidden w-64 shrink-0 border-r border-line bg-surface lg:flex lg:flex-col">
      {/* Brand */}
      <div className="flex h-18 items-center px-6">
        <Link href="/buyer/dashboard" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand font-serif text-sm font-semibold text-white">
            D
          </span>

          <span className="font-serif text-[19px] font-medium tracking-tight text-ink">
            DrukConnect
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5">
        <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Menu
        </p>

        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.href === "/buyer/dashboard"
                ? pathname === "/buyer/dashboard"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-brand-tint text-brand"
                    : "text-muted hover:bg-background hover:text-ink",
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom navigation */}
      <div className="border-t border-line p-3">
        <Link
          href="/dashboard/profile"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/dashboard/profile")
              ? "bg-brand-tint text-brand"
              : "text-muted hover:bg-background hover:text-ink",
          )}
        >
          <User className="h-4.5 w-4.5" strokeWidth={1.9} />

          <span>My Profile</span>
        </Link>

        <Link
          href="/dashboard/settings"
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname.startsWith("/dashboard/settings")
              ? "bg-brand-tint text-brand"
              : "text-muted hover:bg-background hover:text-ink",
          )}
        >
          <Settings className="h-4.5 w-4.5" strokeWidth={1.9} />

          <span>Settings</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink"
        >
          <LogOut className="h-4.5 w-4.5" strokeWidth={1.9} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
