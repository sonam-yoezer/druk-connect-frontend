"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  MessageSquare,
  ShieldCheck,
  Star,
  UserRound,
  Users,
  Store,
} from "lucide-react";

import { useAdminDashboard } from "@/src/features/admin-dashboard/hooks/useAdminDashboard";

const QUICK_ACTIONS = [
  {
    title: "Review moderation",
    description: "Approve or reject pending reviews.",
    href: "/admin-dashboard/reviews",
    icon: Star,
  },
  {
    title: "Manage listings",
    description: "Review and manage marketplace listings.",
    href: "/admin-dashboard/listings",
    icon: Store,
  },
  {
    title: "Manage users",
    description: "View users and manage accounts.",
    href: "/admin-dashboard/users",
    icon: Users,
  },
  {
    title: "View reports",
    description: "Review reported content and activity.",
    href: "/admin-dashboard/reports",
    icon: ClipboardList,
  },
];

export default function DashboardPage() {
  const { data, isPending, isError, refetch } = useAdminDashboard();

  if (isPending) {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Admin dashboard
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Platform overview.
          </h1>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse border border-line bg-surface"
            />
          ))}
        </div>

        <p className="text-sm text-muted">Loading platform analytics...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="border border-line bg-surface p-8">
        <h1 className="font-serif text-2xl font-medium text-ink">
          Unable to load dashboard
        </h1>

        <p className="mt-2 text-sm text-muted">
          We couldn&apos;t retrieve the latest platform analytics. Please try
          again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  const platformStats = [
    {
      label: "Total users",
      value: data.totalUsers,
      description: `${data.newUsersLast7Days} new in the last 7 days`,
      icon: Users,
    },
    {
      label: "Active users",
      value: data.activeUsers,
      description: "Registered platform users",
      icon: UserRound,
    },
    {
      label: "Total listings",
      value: data.totalListings,
      description: `${data.newListingsLast7Days} new in the last 7 days`,
      icon: ClipboardList,
    },
    {
      label: "Active listings",
      value: data.activeListings,
      description: "Currently active listings",
      icon: Store,
    },
    {
      label: "Pending reviews",
      value: data.pendingReviewCount,
      description: "Needs moderation",
      icon: Star,
    },
    {
      label: "Pending vouch withdrawals",
      value: data.pendingVouchWithdrawalCount,
      description: "Needs attention",
      icon: ShieldCheck,
    },
  ];

  const moderationItems = [
    {
      title: "Pending reviews",
      description: "Reviews waiting to be approved or rejected.",
      value: data.pendingReviewCount,
      action: "Manage reviews",
      href: "/admin-dashboard/reviews",
      icon: Star,
    },
    {
      title: "Vouch withdrawals",
      description: "Withdrawal requests awaiting review.",
      value: data.pendingVouchWithdrawalCount,
      action: "Manage vouches",
      href: "/admin-dashboard/vouches",
      icon: ShieldCheck,
    },
    {
      title: "Scam reports",
      description: "Reports that need investigation.",
      value: data.pendingScamReportCount,
      action: "View reports",
      href: "/admin-dashboard/reports",
      icon: MessageSquare,
    },
    {
      title: "Pending appeals",
      description: "Appeals awaiting an administrative decision.",
      value: data.pendingAppealCount,
      action: "Review appeals",
      href: "/admin-dashboard/appeals",
      icon: ClipboardList,
    },
    {
      title: "Unresolved feedback",
      description: "Feedback that still needs a resolution.",
      value: data.unresolvedFeedbackCount,
      action: "View feedback",
      href: "/admin-dashboard/feedback",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Admin dashboard
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Platform overview.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Monitor marketplace activity, manage community content, and keep
            DrukConnect running smoothly.
          </p>
        </div>

        <Link
          href="/admin-dashboard/reviews"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <ShieldCheck className="h-4 w-4" />
          Review activity
        </Link>
      </section>

      {/* Platform analytics */}
      <section>
        <div className="mb-4">
          <h2 className="font-serif text-xl font-medium text-ink">
            Platform statistics
          </h2>
          <p className="mt-1 text-sm text-muted">
            Live figures from the admin dashboard API.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-3">
          {platformStats.map((stat) => (
            <AdminStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
            />
          ))}
        </div>

        <p className="mt-3 text-xs text-faint">
          Last updated:{" "}
          {new Date(data.generatedAt).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      </section>

      {/* Quick actions */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="border border-line bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Manage
          </p>

          <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
            Quick actions
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Jump directly into the areas that need your attention.
          </p>

          <div className="mt-6 space-y-2">
            {QUICK_ACTIONS.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center justify-between border border-line px-4 py-3 transition-colors hover:border-brand hover:bg-brand-tint"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <action.icon className="h-4 w-4 shrink-0 text-brand" />

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">
                      {action.title}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-muted">
                      {action.description}
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border border-line bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Platform health
          </p>

          <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
            At a glance
          </h2>

          <div className="mt-6 space-y-4">
            <HealthRow
              label="Active users"
              value={data.activeUsers}
              total={data.totalUsers}
            />

            <HealthRow
              label="Active listings"
              value={data.activeListings}
              total={data.totalListings}
            />
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <p className="text-sm text-muted">New users this week</p>
            <p className="mt-1 font-serif text-2xl font-medium text-ink">
              {data.newUsersLast7Days.toLocaleString()}
            </p>

            <p className="mt-4 text-sm text-muted">New listings this week</p>
            <p className="mt-1 font-serif text-2xl font-medium text-ink">
              {data.newListingsLast7Days.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Moderation overview */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
              Moderation
            </p>

            <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
              Needs your attention
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              Review outstanding requests, reports, appeals, and feedback.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {moderationItems.map((item) => (
            <ModerationCard
              key={item.title}
              title={item.title}
              description={item.description}
              value={item.value}
              action={item.action}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </div>
      </section>

      {/* Management links */}
      <section className="border border-line bg-surface p-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Administration
          </p>

          <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
            Manage the platform
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Access the main areas of the DrukConnect administration panel.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminManagementLink
            title="Users"
            description="Manage user accounts"
            href="/admin-dashboard/users"
            icon={UserRound}
          />

          <AdminManagementLink
            title="Listings"
            description="Manage marketplace listings"
            href="/admin-dashboard/listings"
            icon={Store}
          />

          <AdminManagementLink
            title="Reviews"
            description="Moderate submitted reviews"
            href="/admin-dashboard/reviews"
            icon={Star}
          />

          <AdminManagementLink
            title="Reports"
            description="Review reported activity"
            href="/admin-dashboard/reports"
            icon={ClipboardList}
          />
        </div>
      </section>
    </div>
  );
}

function AdminStatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: number;
  description: string;
  icon: typeof Users;
}) {
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
          {label}
        </p>

        <Icon className="h-4 w-4 shrink-0 text-brand" />
      </div>

      <p className="mt-3 font-serif text-3xl font-medium text-ink">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}

function HealthRow({
  label,
  value,
  total,
}: {
  label: string;
  value: number;
  total: number;
}) {
  const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{label}</p>
        <p className="text-sm font-semibold text-ink">
          {value.toLocaleString()} / {total.toLocaleString()}
        </p>
      </div>

      <div
        className="mt-2 h-2 overflow-hidden rounded-full bg-brand-tint"
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(percentage)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-brand transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-1 text-xs text-faint">
        {Math.round(percentage)}% of total
      </p>
    </div>
  );
}

function ModerationCard({
  title,
  description,
  value,
  action,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  value: number;
  action: string;
  href: string;
  icon: typeof Star;
}) {
  return (
    <Link
      href={href}
      className="group border border-line bg-surface p-5 transition-colors hover:border-brand"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
            {title}
          </p>

          <p className="mt-3 font-serif text-3xl font-medium text-ink">
            {value.toLocaleString()}
          </p>
        </div>

        <Icon className="h-4 w-4 text-brand" />
      </div>

      <p className="mt-2 text-sm leading-5 text-muted">{description}</p>

      <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-brand">
        {action}
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

function AdminManagementLink({
  title,
  description,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: typeof Users;
}) {
  return (
    <Link
      href={href}
      className="group border border-line p-4 transition-colors hover:border-brand hover:bg-brand-tint"
    >
      <div className="flex items-center justify-between gap-3">
        <Icon className="h-4 w-4 text-brand" />

        <ArrowRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>

      <p className="mt-4 text-sm font-semibold text-ink">{title}</p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </Link>
  );
}
