"use client";

import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { useMyRestrictions } from "@/src/features/lister-restrictions/hooks/useMyRestrictions";
import { useSubmitAppeal } from "@/src/features/lister-restrictions/hooks/useSubmitAppeal";

export default function AccountSuspendedPage() {
  const { data: restrictions, isPending, isError, error } = useMyRestrictions();

  const [appealReason, setAppealReason] = useState("");
  const appealMutation = useSubmitAppeal();

  function handleAppealSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const reason = appealReason.trim();

    if (!reason || appealMutation.isPending) {
      return;
    }

    appealMutation.mutate({ reason });
  }

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-4xl space-y-5 p-4 sm:p-6 lg:p-8">
        <div className="h-8 w-56 animate-pulse rounded-lg bg-background" />
        <div className="h-44 animate-pulse rounded-xl bg-background" />
        <div className="h-36 animate-pulse rounded-xl bg-background" />
        <p className="text-sm text-muted">Loading restriction details...</p>
      </main>
    );
  }

  if (isError || !restrictions) {
    return (
      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <section
          role="alert"
          className="rounded-xl border border-red-200 bg-surface p-6 sm:p-8"
        >
          <AlertCircle className="h-10 w-10 text-red-600" />

          <h1 className="mt-4 text-xl font-semibold text-ink">
            Unable to load restriction details
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted">
            {error instanceof Error
              ? error.message
              : "Something went wrong while retrieving your account status. Please try again later."}
          </p>
        </section>
      </main>
    );
  }

  if (!restrictions.restricted) {
    return (
      <main className="mx-auto w-full max-w-4xl p-4 sm:p-6 lg:p-8">
        <section className="rounded-xl border border-green-200 bg-surface p-6 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-6 w-6 text-green-700" />
          </div>

          <h1 className="mt-4 text-xl font-semibold text-ink">
            No active restrictions
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted">
            Your account currently has no active restrictions. You can continue
            using the features available to your account.
          </p>
        </section>
      </main>
    );
  }

  const restrictedDate = restrictions.restrictedAt
    ? new Date(restrictions.restrictedAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  const appealStatus = restrictions.appealAllowed
    ? "Appeal available"
    : restrictions.latestAppealStatus
      ? restrictions.latestAppealStatus.replaceAll("_", " ")
      : "Appeal unavailable";

  const appealSubmitted = appealMutation.isSuccess;
  const appealStatusAfterSubmit = appealMutation.data?.status;

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Restriction overview */}
      <section className="overflow-hidden rounded-xl border border-red-200 bg-surface">
        <div className="bg-red-50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <ShieldAlert className="h-6 w-6 text-red-700" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700">
                Listing restriction active
              </span>

              <h1 className="mt-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Your listing privileges are restricted
              </h1>

              <p className="mt-2 text-sm leading-6 text-muted">
                {restrictions.message ??
                  "Your ability to create new listings is currently restricted. Review the details below."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
          <div className="rounded-lg border border-line p-4">
            <p className="text-xs font-medium text-muted">
              Restriction reference
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-ink">
              {restrictions.reference ?? "Not available"}
            </p>
          </div>

          <div className="rounded-lg border border-line p-4">
            <p className="text-xs font-medium text-muted">Date applied</p>
            <p className="mt-2 text-sm font-semibold text-ink">
              {restrictedDate ?? "Not available"}
            </p>
          </div>
        </div>
      </section>

      {/* Reason for restriction */}
      <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background">
            <FileText className="h-5 w-5 text-muted" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-ink">
              Reason for restriction
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted">
              Explanation recorded by the DrukConnect moderation team.
            </p>

            <div className="mt-4 rounded-lg border border-red-100 bg-red-50/50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-ink">
                {restrictions.reason?.trim() ||
                  "No additional explanation has been provided. Contact DrukConnect support for clarification."}
              </p>
            </div>

            {restrictions.sourceListingTitle && (
              <div className="mt-5">
                <p className="text-xs font-medium text-muted">
                  Related listing
                </p>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {restrictions.sourceListingTitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Account permissions */}
      <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <h2 className="text-base font-semibold text-ink">
          Account permissions
        </h2>

        <p className="mt-1 text-sm leading-6 text-muted">
          These permissions reflect the current restriction returned by the
          server.
        </p>

        <div className="mt-5 divide-y divide-line">
          {[
            {
              label: "Log in to your account",
              allowed: restrictions.canLogin,
            },
            {
              label: "Browse listings",
              allowed: restrictions.canBrowseListings,
            },
            {
              label: "Create new listings",
              allowed: restrictions.canCreateListings,
            },
          ].map(({ label, allowed }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span className="text-sm font-medium text-ink">{label}</span>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  allowed
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {allowed ? "Allowed" : "Restricted"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Appeal */}
      <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background">
            <Clock3 className="h-5 w-5 text-muted" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-ink">
              Appeal and review
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted">
              If you believe this restriction was applied incorrectly, explain
              your situation below. Your appeal will be sent to the moderation
              team for review.
            </p>
          </div>
        </div>

        {/* Submission confirmation */}
        {appealSubmitted && (
          <div
            role="status"
            className="mt-6 rounded-lg border border-green-200 bg-green-50 p-5"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />

              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold text-green-800">
                  Appeal submitted successfully
                </h3>

                <p className="mt-1 text-sm leading-6 text-green-800">
                  {appealMutation.data.message}
                </p>

                <p className="mt-3 text-sm font-semibold text-green-800">
                  Status:{" "}
                  {(appealStatusAfterSubmit ?? "PENDING").replaceAll("_", " ")}
                </p>

                <p className="mt-1 break-all text-xs text-green-800">
                  Appeal ID: {appealMutation.data.appealId}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submission error */}
        {appealMutation.isError && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4"
          >
            <p className="text-sm font-semibold text-red-800">
              Appeal submission failed
            </p>

            <p className="mt-1 text-sm leading-6 text-red-700">
              {appealMutation.error instanceof Error
                ? appealMutation.error.message
                : "We couldn't submit your appeal. Please try again."}
            </p>
          </div>
        )}

        {/* Form available when permitted */}
        {!appealSubmitted && restrictions.appealAllowed && (
          <form
            onSubmit={handleAppealSubmit}
            className="mt-6 space-y-4 border-t border-line pt-6"
          >
            <div>
              <label
                htmlFor="appeal-reason"
                className="block text-sm font-semibold text-ink"
              >
                Explain why you are appealing
              </label>

              <p className="mt-1 text-sm leading-6 text-muted">
                Include relevant details and explain why you believe the
                restriction should be reconsidered.
              </p>

              <textarea
                id="appeal-reason"
                name="reason"
                value={appealReason}
                onChange={(event) => setAppealReason(event.target.value)}
                placeholder="Write your appeal explanation..."
                rows={5}
                maxLength={3000}
                required
                disabled={appealMutation.isPending}
                className="mt-3 w-full resize-y rounded-lg border border-line bg-background px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-muted">
                  {appealReason.length}/3000
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={
                !appealReason.trim() ||
                appealMutation.isPending ||
                appealReason.trim().length > 3000
              }
              className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {appealMutation.isPending
                ? "Submitting appeal..."
                : "Submit appeal"}
            </button>
          </form>
        )}

        {/* Existing appeal status */}
        {!appealSubmitted && !restrictions.appealAllowed && (
          <div className="mt-6 rounded-lg border border-line bg-background p-5">
            <p className="text-xs font-medium text-muted">
              Current appeal status
            </p>

            <p className="mt-2 text-sm font-semibold capitalize text-ink">
              {appealStatus}
            </p>

            <p className="mt-2 text-sm leading-6 text-muted">
              {restrictions.latestAppealStatus?.toUpperCase() === "PENDING"
                ? "Your appeal is awaiting moderation review. You do not need to submit another appeal while it is pending."
                : "An appeal cannot currently be submitted. Contact DrukConnect support for clarification about your appeal eligibility."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
