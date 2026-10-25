"use client";

import Link from "next/link";
import { Edit3, Mail, MapPin } from "lucide-react";

const PROFILE = {
  name: "Tashi Wangchuk",
  role: "Lister",
  location: "Melbourne, VIC",
  email: "tashi@example.com",
  bio: "Bhutanese community member offering reliable catering and local services across Melbourne.",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80",
};

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <ProfileHeader />

      <ProfileCard />
    </div>
  );
}

function ProfileHeader() {
  return (
    <header className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          Account
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
          Profile
        </h1>

        <p className="mt-2 text-sm text-muted">
          Manage your public profile information.
        </p>
      </div>

      <Link
        href="/dashboard/profile/edit"
        className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        <Edit3 className="h-4 w-4" />
        Edit profile
      </Link>
    </header>
  );
}

function ProfileCard() {
  return (
    <section className="border border-line bg-surface">
      <ProfileIdentity />

      <div className="divide-y divide-line">
        <ProfileField
          label="Email"
          value={PROFILE.email}
          icon={<Mail className="h-4 w-4" />}
        />

        <ProfileField
          label="Location"
          value={PROFILE.location}
          icon={<MapPin className="h-4 w-4" />}
        />

        <div className="p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
            About
          </p>

          <p className="mt-2 text-sm leading-6 text-muted">{PROFILE.bio}</p>
        </div>
      </div>
    </section>
  );
}

function ProfileIdentity() {
  return (
    <div className="flex flex-col gap-5 border-b border-line p-6 sm:flex-row sm:items-center">
      <img
        src={PROFILE.avatar}
        alt={PROFILE.name}
        className="h-20 w-20 rounded-full object-cover"
      />

      <div>
        <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
          {PROFILE.name}
        </h2>

        <p className="mt-1 text-sm text-muted">{PROFILE.role}</p>
      </div>
    </div>
  );
}

function ProfileField({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 p-6">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-background text-faint">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
          {label}
        </p>

        <p className="mt-1 text-sm text-ink">{value}</p>
      </div>
    </div>
  );
}
