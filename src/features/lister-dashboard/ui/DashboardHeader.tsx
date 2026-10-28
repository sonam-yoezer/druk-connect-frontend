"use client";

import { UserAvatar } from "@/src/shared/ui/UserAvatar";
import { useAuthStore } from "../../auth/store/authStore";
import { getDashboardRoute } from "@/src/shared/routes/getDashboardRoute";
import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

export function DashboardHeader() {
  const user = useAuthStore(state => state.user);
  const dashboard = user ? getDashboardRoute(user) : "/buyer-dashboard";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 border-b border-line bg-surface/95 backdrop-blur">
        <div className="flex h-full items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted hover:text-ink lg:hidden"
              aria-label="Toggle navigation"
            >
              <Menu className="h-4 w-4" />
            </button>

            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

              <input
                type="search"
                placeholder="Search your dashboard..."
                className="h-9 w-64 rounded-md border border-line bg-background pl-9 pr-3 text-sm text-ink outline-none placeholder:text-faint focus:border-brand-line"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-background hover:text-ink"
              aria-label="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-brand" />
            </button>

            <Link
              href={`${dashboard}/profile`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-tint text-sm font-semibold text-brand"
              aria-label="Open profile"
            >
              <UserAvatar name={[user?.firstName, user?.lastName].filter(Boolean).join(" ")} imageUrl={user?.profileImageUrl} size={36} />
            </Link>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <MobileNavigation onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}

function MobileNavigation({ onClose }: { onClose: () => void }) {
  const user = useAuthStore(state => state.user);
  const base = user ? getDashboardRoute(user) : "/buyer-dashboard";
  const links = [
    ["Dashboard", "/dashboard"],
    ["My Listings", "/dashboard/listings"],
    ["Requests", "/dashboard/requests"],
    ["Messages", "/dashboard/messages"],
    ["Vouches", "/dashboard/vouches"],
    ["Profile", "/dashboard/profile"],
    ["Settings", "/dashboard/settings"],
  ];

  return (
    <div className="fixed inset-x-0 top-16 z-20 border-b border-line bg-surface px-5 py-4 lg:hidden">
      <nav className="space-y-1">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href.replace("/dashboard", base)}
            onClick={onClose}
            className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted hover:bg-background hover:text-ink"
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
