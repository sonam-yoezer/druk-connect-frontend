"use client";

import Link from "next/link";
import { Bell, ChevronRight, Lock, Mail, Shield, Trash2 } from "lucide-react";

const SETTINGS = [
  {
    title: "Account",
    description: "Manage your email and password.",
    icon: Lock,
    href: "/dashboard/settings/account",
  },
  {
    title: "Notifications",
    description: "Choose how you want to receive notifications.",
    icon: Bell,
    href: "/dashboard/settings/notifications",
  },
  {
    title: "Privacy",
    description: "Control your profile visibility and contact preferences.",
    icon: Shield,
    href: "/dashboard/settings/privacy",
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <SettingsHeader />

      <section className="border border-line bg-surface">
        <div className="divide-y divide-line">
          {SETTINGS.map((setting) => (
            <SettingsItem key={setting.href} {...setting} />
          ))}
        </div>
      </section>

      <section className="border border-line bg-surface">
        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-danger">
            Danger zone
          </p>

          <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
            Delete your account
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Permanently remove your account, listings, and other associated
            information from DrukConnect.
          </p>

          <button
            type="button"
            className="mt-5 inline-flex h-10 items-center gap-2 rounded-md border border-danger px-4 text-sm font-semibold text-danger transition-colors hover:bg-danger-tint"
          >
            <Trash2 className="h-4 w-4" />
            Delete account
          </button>
        </div>
      </section>
    </div>
  );
}

function SettingsHeader() {
  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
        Account
      </p>

      <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
        Settings
      </h1>

      <p className="mt-2 text-sm text-muted">
        Manage your account and preferences.
      </p>
    </header>
  );
}

function SettingsItem({
  title,
  description,
  icon: Icon,
  href,
}: {
  title: string;
  description: string;
  icon: typeof Lock;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 p-6 transition-colors hover:bg-background"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background text-faint">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>

        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-brand" />
    </Link>
  );
}
