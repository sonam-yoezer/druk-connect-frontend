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

const RECENT_ACTIVITY = [
  {
    id: 1,
    type: "Review",
    title: "New review awaiting moderation",
    description:
      "A new review was submitted for Authentic Bhutanese Home Cooking.",
    time: "12 min ago",
    href: "/admin-dashboard/reviews",
    icon: Star,
  },
  {
    id: 2,
    type: "Listing",
    title: "New listing created",
    description: "Himalayan Moving Services was added to the marketplace.",
    time: "1h ago",
    href: "/admin-dashboard/listings",
    icon: Store,
  },
  {
    id: 3,
    type: "Vouch",
    title: "Vouch request received",
    description: "A new vouch request is waiting for review.",
    time: "2h ago",
    href: "/admin-dashboard/vouches",
    icon: ShieldCheck,
  },
];

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

const PLATFORM_OVERVIEW = [
  {
    label: "Total users",
    value: "2,486",
    description: "+24 this week",
    icon: Users,
  },
  {
    label: "Active listings",
    value: "158",
    description: "+8 this week",
    icon: Store,
  },
  {
    label: "Pending reviews",
    value: "7",
    description: "Needs moderation",
    icon: Star,
  },
  {
    label: "Pending vouches",
    value: "12",
    description: "Needs attention",
    icon: ShieldCheck,
  },
];

export default function DashboardPage() {
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

      {/* Platform stats */}
      <section className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        {PLATFORM_OVERVIEW.map((stat) => (
          <AdminStatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </section>

      {/* Activity + Quick actions */}
      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        {/* Recent activity */}
        <div className="border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                Activity
              </p>

              <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
                Recent activity
              </h2>
            </div>

            <Link
              href="/admin-dashboard/reviews"
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {RECENT_ACTIVITY.map((activity) => (
              <AdminActivityCard
                key={activity.id}
                type={activity.type}
                title={activity.title}
                description={activity.description}
                time={activity.time}
                href={activity.href}
                icon={activity.icon}
              />
            ))}
          </div>
        </div>

        {/* Quick actions */}
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
          </div>

          <Link
            href="/admin-dashboard/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View moderation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ModerationCard
            title="Pending reviews"
            description="Reviews waiting to be approved or rejected."
            value="7"
            action="Manage reviews"
            href="/admin-dashboard/reviews"
            icon={Star}
          />

          <ModerationCard
            title="Pending vouches"
            description="Vouch requests waiting for attention."
            value="12"
            action="Manage vouches"
            href="/admin-dashboard/vouches"
            icon={ShieldCheck}
          />

          <ModerationCard
            title="Reported content"
            description="Listings or activity reported by users."
            value="3"
            action="View reports"
            href="/admin-dashboard/reports"
            icon={MessageSquare}
          />
        </div>
      </section>

      {/* Management links */}
      <section className="border border-line bg-surface p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
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
  value: string;
  description: string;
  icon: typeof Users;
}) {
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
          {label}
        </p>

        <Icon className="h-4 w-4 text-brand" />
      </div>

      <p className="mt-3 font-serif text-3xl font-medium text-ink">{value}</p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}

function AdminActivityCard({
  type,
  title,
  description,
  time,
  href,
  icon: Icon,
}: {
  type: string;
  title: string;
  description: string;
  time: string;
  href: string;
  icon: typeof Star;
}) {
  return (
    <Link
      href={href}
      className="group block border border-line p-4 transition-colors hover:border-brand"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5 shrink-0">
          <Icon className="h-4 w-4 text-brand" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
                {type}
              </p>

              <p className="mt-1 text-sm font-semibold text-ink">{title}</p>
            </div>

            <ArrowRight className="h-4 w-4 shrink-0 text-faint transition-transform group-hover:translate-x-0.5" />
          </div>

          <p className="mt-2 text-sm leading-5 text-muted">{description}</p>

          <p className="mt-3 text-xs text-faint">{time}</p>
        </div>
      </div>
    </Link>
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
  value: string;
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
            {value}
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
