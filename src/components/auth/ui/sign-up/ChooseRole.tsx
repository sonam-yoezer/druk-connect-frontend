"use client";

import { ArrowRight, BriefcaseBusiness, ShoppingBag } from "lucide-react";

type SignupRole = "BUYER" | "LISTER";

type ChooseRoleProps = {
  onSelect: (role: SignupRole) => void;
};

const ROLES = [
  {
    role: "BUYER" as const,
    title: "I'm a Buyer",
    description: "Discover trusted products and services from the community.",
    action: "Continue as Buyer",
    icon: ShoppingBag,
  },
  {
    role: "LISTER" as const,
    title: "I'm a Lister",
    description:
      "List your products and services and build trust with the community.",
    action: "Become a Lister",
    icon: BriefcaseBusiness,
    badge: "Vouched",
  },
];

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

export function ChooseRole({ onSelect }: ChooseRoleProps) {
  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint">
          <LogoMark />
        </div>

        <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
          Join DrukConnect
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          Choose how you want to use DrukConnect. You can discover services as a
          buyer or share your own with the community.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map((role) => (
          <RoleCard
            key={role.role}
            role={role.role}
            title={role.title}
            description={role.description}
            action={role.action}
            icon={role.icon}
            badge={role.badge}
            onSelect={onSelect}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{" "}
        <a
          href="/auth/signin"
          className="font-semibold text-brand transition-colors hover:text-brand-dark"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}

function RoleCard({
  role,
  title,
  description,
  action,
  icon: Icon,
  badge,
  onSelect,
}: {
  role: SignupRole;
  title: string;
  description: string;
  action: string;
  icon: typeof ShoppingBag;
  badge?: string;
  onSelect: (role: SignupRole) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className="group flex min-h-[260px] flex-col rounded-md border border-line bg-surface p-6 text-left transition-colors duration-200 hover:border-brand-line focus:outline-none focus:ring-2 focus:ring-brand/30"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
          <Icon className="h-5 w-5" />
        </div>

        {badge && (
          <span className="rounded-md bg-jade-tint px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-jade">
            {badge}
          </span>
        )}
      </div>

      <div className="mt-7">
        <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
          {title}
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
          {description}
        </p>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-brand">
        {action}

        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </button>
  );
}
