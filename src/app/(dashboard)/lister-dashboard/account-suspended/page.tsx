"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CircleAlert,
  Clock,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { useMyRestrictions } from "@/src/features/lister-restrictions/hooks/useMyRestrictions";

export default function AccountSuspendedPage() {
  const { data: restrictions, isPending, isError, error } = useMyRestrictions();

  if (isPending) {
    return (
      <div className="mx-auto max-w-4xl p-6 sm:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 rounded bg-background" />
          <div className="h-40 rounded-xl bg-background" />
          <div className="h-32 rounded-xl bg-background" />
        </div>
        <p className="mt-4 text-sm text-muted">
          Checking your account status...
        </p>
      </div>
    );
  }

  if (isError || !restrictions) {
    return (
      <div className="mx-auto max-w-3xl p-6 sm:p-8">
        <Link
          href="/lister-dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>

        <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <CircleAlert className="h-10 w-10 text-red-600" />
          <h1 className="mt-4 text-xl font-semibold text-ink">
            Unable to load account status
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            {error instanceof Error
              ? error.message
              : "We couldn't retrieve your account restriction details. Please try again later."}
          </p>
        </section>
      </div>
    );
  }

  if (!restrictions.restricted) {
    return (
      <div className="mx-auto max-w-3xl p-6 sm:p-8">
        <section className="rounded-xl border border-line bg-surface p-6 sm:p-8">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
          <h1 className="mt-4 text-xl font-semibold text-ink">
            No active restrictions
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Your account currently has no active restriction. You can continue
            using the features available to your account.
          </p>
          <Link
            href="/lister-dashboard"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Return to dashboard
          </Link>
        </section>
      </div>
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

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <Link
        href="/lister-dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      {/* Restriction summary */}
      <section className="overflow-hidden rounded-xl border border-red-200 bg-surface">
        <div className="border-b border-red-200 bg-red-50 p-5 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <ShieldAlert className="h-6 w-6 text-red-700" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700">
                Listing restriction active
              </span>

              <h1 className="mt-3 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Your listing privileges are restricted
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                {restrictions.message ??
                  "You are currently unable to create new listings. Review the details below to understand this restriction."}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
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
      <section className="rounded-xl border border-line bg-surface p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background">
            <FileText className="h-5 w-5 text-muted" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-ink">
              Reason for restriction
            </h2>
            <p className="mt-1 text-sm leading-6 text-muted">
              The reason recorded by the DrukConnect moderation team.
            </p>

            <div className="mt-4 rounded-lg border border-red-100 bg-red-50/50 p-4">
              <p className="whitespace-pre-wrap text-sm leading-7 text-ink">
                {restrictions.reason?.trim() ||
                  "No additional explanation has been provided. Please contact DrukConnect support for clarification."}
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

      {/* Permissions */}
      <section className="rounded-xl border border-line bg-surface p-5 sm:p-7">
        <h2 className="text-base font-semibold text-ink">
          What can you still do?
        </h2>
        <p className="mt-1 text-sm text-muted">
          Your current account permissions are listed below.
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
          ].map((permission) => (
            <div
              key={permission.label}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <span className="text-sm font-medium text-ink">
                {permission.label}
              </span>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                  permission.allowed
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {permission.allowed ? "Allowed" : "Restricted"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Appeal status and support */}
      <section className="rounded-xl border border-line bg-surface p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background">
            <Clock className="h-5 w-5 text-muted" />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-ink">
              Appeal and next steps
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              If you believe this restriction was applied incorrectly, review
              your appeal status or contact DrukConnect support for assistance.
            </p>

            <div className="mt-4 rounded-lg border border-line bg-background p-4">
              <p className="text-xs font-medium text-muted">
                Current appeal status
              </p>
              <p className="mt-1 text-sm font-semibold capitalize text-ink">
                {appealStatus}
              </p>
            </div>

            {!restrictions.appealAllowed && (
              <p className="mt-3 text-xs leading-5 text-muted">
                An appeal cannot currently be started from this page. Contact
                support if you need clarification about the restriction or
                appeal eligibility.
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-line pt-5">
          <Link
            href="/lister-dashboard"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Return to dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
