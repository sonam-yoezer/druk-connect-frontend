"use client";

import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileText,
  RefreshCw,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { usePendingAppeals } from "./hooks/usePendingAppeals";
import { useModerateAppeal } from "./hooks/useModerateAppeal";
import type { AppealModerationAction } from "./types/adminAppeal";

const PAGE_SIZE = 10;
const MAX_REASON_LENGTH = 3000;

function formatDate(date: string | null) {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return parsedDate.toLocaleString();
}

function shortenId(id: string | null) {
  if (!id) return "N/A";

  return `${id.slice(0, 8)}...`;
}

function Metadata({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-1 break-all text-sm text-gray-800">{value || "N/A"}</p>
    </div>
  );
}

export default function PendingAppeals() {
  const [page, setPage] = useState(1);

  const [moderationReasons, setModerationReasons] = useState<
    Record<string, string>
  >({});

  const [moderationErrors, setModerationErrors] = useState<
    Record<string, string>
  >({});

  const [moderatingAppealId, setModeratingAppealId] = useState<string | null>(
    null,
  );

  const { data, isPending, isError, error, refetch, isFetching } =
    usePendingAppeals(page, PAGE_SIZE);

  const moderation = useModerateAppeal();

  async function handleModeration(
    appealId: string,
    action: AppealModerationAction,
  ) {
    const reason = moderationReasons[appealId]?.trim();

    if (!reason) {
      setModerationErrors((current) => ({
        ...current,
        [appealId]: "Please provide a moderation reason.",
      }));
      return;
    }

    setModerationErrors((current) => ({
      ...current,
      [appealId]: "",
    }));

    setModeratingAppealId(appealId);

    try {
      await moderation.mutateAsync({
        appealId,
        action,
        reason,
      });

      setModerationReasons((current) => {
        const updated = { ...current };
        delete updated[appealId];
        return updated;
      });
    } catch (err) {
      setModerationErrors((current) => ({
        ...current,
        [appealId]:
          err instanceof Error
            ? err.message
            : "Failed to moderate this appeal. Please try again.",
      }));
    } finally {
      setModeratingAppealId(null);
    }
  }

  if (isPending) {
    return (
      <section className="space-y-4" aria-label="Loading pending appeals">
        <div className="h-8 w-56 animate-pulse rounded bg-gray-200" />

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-xl border border-gray-200 bg-gray-100"
          />
        ))}
      </section>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div className="flex-1">
            <h2 className="font-semibold text-red-800">
              Failed to load pending appeals
            </h2>

            <p className="mt-1 text-sm text-red-700">
              {error instanceof Error
                ? error.message
                : "Something went wrong. Please try again."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-50"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const appeals = data?.appeals ?? [];
  const totalPending = data?.totalElements ?? 0;
  const totalPages = data?.totalPages ?? 0;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Appeal management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and moderate appeals submitted by restricted listers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-100 p-2">
              <Clock3 className="h-5 w-5 text-amber-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Pending appeals</p>
              <p className="text-2xl font-bold text-gray-900">{totalPending}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Current page</p>
              <p className="text-2xl font-bold text-gray-900">
                {data?.currentPage ?? page} / {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appeal list */}
      {appeals.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-14 text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-green-600" />

          <h2 className="mt-4 text-lg font-semibold text-gray-900">
            No pending appeals
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            There are currently no appeals waiting for review.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {appeals.map((appeal) => {
            const isModerating = moderatingAppealId === appeal.appealId;
            const reason = moderationReasons[appeal.appealId] ?? "";
            const moderationError = moderationErrors[appeal.appealId];

            return (
              <article
                key={appeal.appealId}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6"
              >
                {/* Appeal heading */}
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                      Appeal ID
                    </p>

                    <h2 className="mt-1 break-all font-semibold text-gray-900">
                      {appeal.appealId}
                    </h2>
                  </div>

                  <span className="inline-flex w-fit items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    {appeal.status}
                  </span>
                </div>

                {/* Lister's appeal reason */}
                <div className="mt-5 rounded-lg bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-700">
                    Lister's appeal reason
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {appeal.appealReason}
                  </p>
                </div>

                {/* Appeal metadata */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <Metadata
                    label="Lister user ID"
                    value={shortenId(appeal.listerUserId)}
                  />

                  <Metadata
                    label="Restriction ID"
                    value={shortenId(appeal.restrictionId)}
                  />

                  <Metadata
                    label="Source report ID"
                    value={shortenId(appeal.sourceReportId)}
                  />

                  <Metadata
                    label="Submitted at"
                    value={formatDate(appeal.submittedAt)}
                  />

                  <Metadata
                    label="Moderated at"
                    value={formatDate(appeal.moderatedAt)}
                  />

                  {appeal.moderationReason && (
                    <Metadata
                      label="Moderation reason"
                      value={appeal.moderationReason}
                    />
                  )}
                </div>

                {/* Moderation controls */}
                <div className="mt-6 border-t border-gray-200 pt-5">
                  <label
                    htmlFor={`moderation-reason-${appeal.appealId}`}
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Moderation reason
                  </label>

                  <textarea
                    id={`moderation-reason-${appeal.appealId}`}
                    value={reason}
                    onChange={(event) => {
                      const value = event.target.value;

                      setModerationReasons((current) => ({
                        ...current,
                        [appeal.appealId]: value,
                      }));

                      setModerationErrors((current) => ({
                        ...current,
                        [appeal.appealId]: "",
                      }));
                    }}
                    placeholder="Explain why this appeal is approved or rejected..."
                    rows={3}
                    maxLength={MAX_REASON_LENGTH}
                    disabled={isModerating}
                    aria-invalid={Boolean(moderationError)}
                    aria-describedby={
                      moderationError
                        ? `moderation-error-${appeal.appealId}`
                        : undefined
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-gray-50"
                  />

                  <p className="mt-1 text-right text-xs text-gray-500">
                    {reason.length}/{MAX_REASON_LENGTH}
                  </p>

                  {moderationError && (
                    <p
                      id={`moderation-error-${appeal.appealId}`}
                      role="alert"
                      className="mt-2 text-sm text-red-600"
                    >
                      {moderationError}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      disabled={isModerating || !reason.trim()}
                      onClick={() =>
                        handleModeration(appeal.appealId, "APPROVE")
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isModerating ? "Processing..." : "Approve appeal"}
                    </button>

                    <button
                      type="button"
                      disabled={isModerating || !reason.trim()}
                      onClick={() =>
                        handleModeration(appeal.appealId, "REJECT")
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <XCircle className="h-4 w-4" />
                      {isModerating ? "Processing..." : "Reject appeal"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Page {data?.currentPage ?? page} of {totalPages} · {totalPending}{" "}
            pending appeal{totalPending === 1 ? "" : "s"}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!data?.hasPrevious || isFetching}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              type="button"
              disabled={!data?.hasNext || isFetching}
              onClick={() => setPage((current) => current + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
