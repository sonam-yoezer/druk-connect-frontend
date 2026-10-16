"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MessageSquareText,
  RefreshCw,
} from "lucide-react";

import type { AdminFeedbackItem } from "./types/adminFeedback";
import { useAdminFeedback } from "./hooks/useAdminFeedback";
import { useUpdateAdminFeedbackStatus } from "./hooks/useUpdateAdminFeedbackStatus";
import type { AdminFeedbackStatus } from "./api/updateAdminFeedbackStatus";

const PAGE_SIZE = 20;

const STATUS_OPTIONS: {
  value: AdminFeedbackStatus;
  label: string;
}[] = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESOLVED", label: "Resolved" },
];

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700",
  IN_PROGRESS: "bg-amber-50 text-amber-700",
  RESOLVED: "bg-green-50 text-green-700",
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatLabel(value: string | null | undefined) {
  if (!value) return "Not specified";

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function StatusBadge({ status }: { status: string }) {
  const styles = STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700";

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles}`}
    >
      {formatLabel(status)}
    </span>
  );
}

function FeedbackCard({ item }: { item: AdminFeedbackItem }) {
  const isMicro = item.source === "MICRO";
  const updateStatus = useUpdateAdminFeedbackStatus();

  async function handleStatusChange(status: AdminFeedbackStatus) {
    if (status === item.status || updateStatus.isPending) {
      return;
    }

    try {
      await updateStatus.mutateAsync({
        feedbackId: item.feedbackId,
        status,
      });
    } catch {
      // The mutation error is displayed below the status selector.
    }
  }

  return (
    <article className="rounded-xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-background px-2.5 py-1 text-xs font-medium text-ink">
            {isMicro ? "Micro feedback" : "Feedback form"}
          </span>

          <span className="rounded-md bg-background px-2.5 py-1 text-xs text-muted">
            {isMicro
              ? formatLabel(item.microRating ?? "No rating")
              : formatLabel(item.type)}
          </span>
        </div>

        <StatusBadge status={item.status} />
      </div>

      <div className="mt-4">
        <label
          htmlFor={`feedback-status-${item.feedbackId}`}
          className="mb-2 block text-xs font-medium text-muted"
        >
          Update status
        </label>

        <select
          id={`feedback-status-${item.feedbackId}`}
          value={item.status}
          onChange={(event) => {
            void handleStatusChange(event.target.value as AdminFeedbackStatus);
          }}
          disabled={updateStatus.isPending}
          className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-50 sm:w-52"
        >
          {!STATUS_OPTIONS.some((option) => option.value === item.status) && (
            <option value={item.status} disabled>
              {formatLabel(item.status)}
            </option>
          )}

          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {updateStatus.isPending && (
          <p className="mt-2 text-xs text-muted" role="status">
            Updating status...
          </p>
        )}

        {updateStatus.isError && (
          <p className="mt-2 text-sm text-red-600" role="alert">
            {updateStatus.error instanceof Error
              ? updateStatus.error.message
              : "Could not update feedback status. Please try again."}
          </p>
        )}
      </div>

      <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink">
        {item.message}
      </p>

      <div className="mt-4 grid gap-4 border-t border-line pt-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-muted">Submitted by</p>

          <p className="mt-1 text-sm font-medium text-ink">
            {item.anonymous
              ? "Anonymous"
              : (item.submitterName ?? "Unknown user")}
          </p>

          {!item.anonymous && item.submitterEmail && (
            <p className="mt-1 break-all text-sm text-muted">
              {item.submitterEmail}
            </p>
          )}

          <p className="mt-3 text-xs text-muted">User ID</p>
          <p className="mt-1 break-all text-xs text-muted">
            {item.anonymous
              ? "Hidden"
              : (item.submittedByUserId ?? "Not available")}
          </p>
        </div>

        <div>
          <p className="text-xs text-muted">Perspective / role</p>

          <p className="mt-1 text-sm text-ink">
            {formatLabel(item.perspective ?? item.submitterAccessType)}
          </p>

          <p className="mt-3 text-xs text-muted">Submitted</p>
          <p className="mt-1 text-sm text-ink">
            {formatDate(item.submittedAt)}
          </p>

          <p className="mt-3 text-xs text-muted">Last updated</p>
          <p className="mt-1 text-sm text-ink">{formatDate(item.updatedAt)}</p>
        </div>
      </div>

      {item.screenshotPath && (
        <div className="mt-4 rounded-lg bg-background p-3">
          <p className="text-sm font-medium text-ink">Screenshot attached</p>

          <p className="mt-1 break-all text-xs text-muted">
            {item.screenshotPath}
          </p>
        </div>
      )}

      {item.themeLabel && (
        <p className="mt-3 text-sm text-muted">Theme: {item.themeLabel}</p>
      )}

      {item.resolvedAt && (
        <p className="mt-3 text-xs text-muted">
          Resolved on {formatDate(item.resolvedAt)}
        </p>
      )}

      {item.canFollowUp && !item.anonymous && item.submitterEmail && (
        <p className="mt-3 text-xs text-muted">
          Submitter can be contacted for follow-up.
        </p>
      )}
    </article>
  );
}

function FeedbackLoading() {
  return (
    <div
      className="flex items-center justify-center py-20 text-sm text-muted"
      role="status"
    >
      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
      Loading feedback...
    </div>
  );
}

function FeedbackError({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <p className="font-medium text-ink">Could not load feedback</p>

      <p className="mt-2 text-sm text-muted">{message}</p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-ink hover:bg-brand-dark"
      >
        Try again
      </button>
    </div>
  );
}

function EmptyFeedback() {
  return (
    <div className="rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center">
      <MessageSquareText className="mx-auto h-10 w-10 text-muted" />

      <h2 className="mt-4 font-medium text-ink">No feedback yet</h2>

      <p className="mt-2 text-sm text-muted">
        User submissions will appear here.
      </p>
    </div>
  );
}

export default function AdminFeedbackList() {
  const [page, setPage] = useState(1);

  const { data, isPending, isError, error, refetch, isFetching } =
    useAdminFeedback(page, PAGE_SIZE);

  if (isPending) {
    return <FeedbackLoading />;
  }

  if (isError) {
    return (
      <FeedbackError
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching feedback."
        }
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  const feedback = data.feedback;
  const totalElements = data.totalElements;
  const totalPages = data.totalPages;
  const displayPage = data.currentPage;
  const pageCount = Math.max(totalPages, 1);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted">
            Review feedback submitted by DrukConnect users.
          </p>

          <p className="mt-1 text-sm text-muted">
            {totalElements} total submission
            {totalElements === 1 ? "" : "s"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            void refetch();
          }}
          disabled={isFetching}
          className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {feedback.length === 0 ? (
        <EmptyFeedback />
      ) : (
        <div className="space-y-4">
          {feedback.map((item) => (
            <FeedbackCard key={item.feedbackId} item={item} />
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
        <p className="text-sm text-muted">
          Page {displayPage} of {pageCount}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setPage((current) => Math.max(1, current - 1));
            }}
            disabled={!data.hasPrevious || isFetching}
            className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm text-ink hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <button
            type="button"
            onClick={() => {
              setPage((current) => current + 1);
            }}
            disabled={!data.hasNext || isFetching}
            className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-sm text-ink hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
