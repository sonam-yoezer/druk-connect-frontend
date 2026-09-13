"use client";

import { Eye, MessageSquare, Store, Users } from "lucide-react";

const OVERVIEW = [
  {
    label: "Total views",
    value: "126",
    change: "+18%",
    description: "vs last month",
    icon: Eye,
  },
  {
    label: "Listing views",
    value: "94",
    change: "+12%",
    description: "across your listings",
    icon: Store,
  },
  {
    label: "Requests",
    value: "4",
    change: "+2",
    description: "this month",
    icon: MessageSquare,
  },
  {
    label: "Profile views",
    value: "32",
    change: "+24%",
    description: "this month",
    icon: Users,
  },
];

const LISTING_INSIGHTS = [
  {
    title: "Bhutanese Catering",
    category: "Food",
    views: 42,
    requests: 2,
    conversion: "4.8%",
  },
  {
    title: "Airport Pickup",
    category: "Transport",
    views: 31,
    requests: 1,
    conversion: "3.2%",
  },
  {
    title: "Maths & Science Tutoring",
    category: "Tutoring",
    views: 21,
    requests: 1,
    conversion: "4.7%",
  },
];

const ACTIVITY = [
  {
    label: "Listing views",
    value: 42,
  },
  {
    label: "Requests received",
    value: 4,
  },
  {
    label: "Profile views",
    value: 32,
  },
  {
    label: "Vouches received",
    value: 2,
  },
];

export default function InsightsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-8">
      <InsightsHeader />

      <OverviewStats />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <ListingPerformance />

        <ActivityOverview />
      </div>
    </div>
  );
}

function InsightsHeader() {
  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
        Performance
      </p>

      <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
        Insights
      </h1>

      <p className="mt-2 text-sm text-muted">
        See how your listings and profile are performing.
      </p>
    </header>
  );
}

function OverviewStats() {
  return (
    <section className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {OVERVIEW.map((stat) => (
        <div key={stat.label} className="bg-surface p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
              {stat.label}
            </p>

            <stat.icon className="h-4 w-4 text-faint" />
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              {stat.value}
            </span>

            <span className="text-xs font-semibold text-jade">
              {stat.change}
            </span>
          </div>

          <p className="mt-1 text-xs text-muted">{stat.description}</p>
        </div>
      ))}
    </section>
  );
}

function ListingPerformance() {
  return (
    <section className="border border-line bg-surface">
      <div className="flex items-end justify-between border-b border-line p-6">
        <div>
          <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
            Listing performance
          </h2>

          <p className="mt-1 text-sm text-muted">
            See which services are getting the most attention.
          </p>
        </div>

        <span className="text-xs text-faint">This month</span>
      </div>

      <div className="divide-y divide-line">
        {LISTING_INSIGHTS.map((listing) => (
          <ListingInsightRow key={listing.title} {...listing} />
        ))}
      </div>
    </section>
  );
}

function ListingInsightRow({
  title,
  category,
  views,
  requests,
  conversion,
}: {
  title: string;
  category: string;
  views: number;
  requests: number;
  conversion: string;
}) {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
            {category}
          </p>

          <h3 className="mt-1 font-serif text-lg font-medium tracking-tight text-ink">
            {title}
          </h3>
        </div>

        <span className="shrink-0 text-sm font-semibold text-ink">
          {views} views
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <InsightMetric label="Views" value={views.toString()} />

        <InsightMetric label="Requests" value={requests.toString()} />

        <InsightMetric label="Request rate" value={conversion} />
      </div>
    </div>
  );
}

function ActivityOverview() {
  return (
    <section className="border border-line bg-surface">
      <div className="border-b border-line p-6">
        <h2 className="font-serif text-xl font-medium tracking-tight text-ink">
          Activity overview
        </h2>

        <p className="mt-1 text-sm text-muted">Your activity this month.</p>
      </div>

      <div className="divide-y divide-line">
        {ACTIVITY.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 px-6 py-4"
          >
            <span className="text-sm text-muted">{item.label}</span>

            <span className="text-sm font-semibold text-ink">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-background p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
          Reputation
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-3xl font-medium text-ink">4.8</span>

          <span className="text-sm text-muted">average rating</span>
        </div>

        <p className="mt-1 text-xs text-muted">
          Based on 12 reviews and 2 vouches.
        </p>
      </div>
    </section>
  );
}

function InsightMetric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-faint">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
