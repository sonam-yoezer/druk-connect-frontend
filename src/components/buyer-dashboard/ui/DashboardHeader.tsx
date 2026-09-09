"use client";

import { Bell, Menu, Search } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-18 items-center justify-between border-b border-line bg-background/95 px-5 backdrop-blur sm:px-8 lg:px-10">
      {/* Mobile menu */}
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-surface hover:text-ink lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search */}
      <div className="hidden w-full max-w-md lg:block">
        <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3.5 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.9} />

          <input
            type="search"
            placeholder="Search DrukConnect..."
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          className="relative grid h-10 w-10 place-items-center rounded-xl text-muted transition-colors hover:bg-surface hover:text-ink"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" strokeWidth={1.9} />

          <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-brand" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2.5 rounded-xl p-1.5 pr-2.5 transition-colors hover:bg-surface"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-sm font-medium text-white">
            U
          </span>

          <span className="hidden text-left sm:block">
            <span className="block text-[13px] font-medium text-ink">User</span>

            <span className="block text-[11px] text-muted">Buyer</span>
          </span>
        </button>
      </div>
    </header>
  );
}
