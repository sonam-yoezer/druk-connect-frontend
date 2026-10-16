"use client";

import {
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  MessageSquare,
  Users,
} from "lucide-react";
import { useFeedbackAnalytics } from "./hooks/useFeedbackAnalytics";

function formatPercentage(value: number) {
  return `${value.toLocaleString(undefined, {
    maximumFractionDigits: 1,
  })}%`;
}

function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: typeof MessageSquare;
}) {
  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-ink">{value}</p>
        </div>

        <div className="rounded-lg bg-background p-2">
          <Icon className="h-5 w-5 text-brand" />
        </div>
      </div>

      <p className="mt-3 text-xs text-muted">{description}</p>
    </article>
  );
}

export default function FeedbackAnalyticsCards() {
  const { data, isPending, isError, error, refetch, isFetching } =
    useFeedbackAnalytics();

  if (isPending) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6 text-sm text-muted">
        Loading feedback analytics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-line bg-surface p-6">
        <p className="font-medium text-ink">
          Could not load feedback analytics
        </p>

        <p className="mt-2 text-sm text-muted">
          {error instanceof Error ? error.message : "Something went wrong."}
        </p>

        <button
          type="button"
          onClick={() => void refetch()}
          disabled={isFetching}
          className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-ink hover:bg-brand-dark disabled:opacity-50"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-ink">Feedback analytics</h2>
        <p className="mt-1 text-sm text-muted">
          An overview of user feedback and unresolved issues.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnalyticsCard
          title="New this week"
          value={data.newThisWeek}
          description="Feedback submissions received this week."
          icon={MessageSquare}
        />

        <AnalyticsCard
          title="Unresolved feedback"
          value={data.unresolvedCount}
          description="Feedback that still needs resolution."
          icon={AlertCircle}
        />

        <AnalyticsCard
          title="From listers"
          value={formatPercentage(data.fromListersPercent)}
          description="Share of feedback submitted by listers."
          icon={Users}
        />

        <AnalyticsCard
          title="From browsing users"
          value={formatPercentage(data.fromBrowsingUsersPercent)}
          description="Share of feedback submitted by browsing users."
          icon={ClipboardList}
        />

        <AnalyticsCard
          title="Easy experience"
          value={formatPercentage(data.easyMicroFeedbackPercent30Days)}
          description="Micro feedback rated easy over the last 30 days."
          icon={CheckCircle2}
        />
      </div>

      <div className="rounded-xl border border-line bg-surface p-5">
        <h3 className="font-semibold text-ink">Recurring themes</h3>

        {data.recurringThemes.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            No recurring themes identified yet.
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.recurringThemes.map((theme) => (
              <span
                key={theme}
                className="rounded-full bg-background px-3 py-1.5 text-sm text-ink"
              >
                {theme}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
