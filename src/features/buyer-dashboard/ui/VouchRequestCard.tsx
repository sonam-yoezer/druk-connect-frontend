"use client";

import { Check, Clock3, Mail, X } from "lucide-react";

import type { IncomingVouchRequest } from "../types/vouchRequest";

type RespondingState = {
  requestId: string;
  action: "accept" | "decline";
} | null;

type VouchRequestCardProps = {
  request: IncomingVouchRequest;
  responding: RespondingState;
  onRespond: (requestId: string, accept: boolean) => void;
};

export default function VouchRequestCard({
  request,
  responding,
  onRespond,
}: VouchRequestCardProps) {
  const fullName =
    `${request.requesterFirstName} ${request.requesterLastName}`.trim();

  const status = request.status.trim().toUpperCase();

  const isPending = status === "PENDING";

  const isResponding = responding?.requestId === request.requestId;

  const isAccepting = isResponding && responding.action === "accept";

  const isDeclining = isResponding && responding.action === "decline";

  const initials = getInitials(
    request.requesterFirstName,
    request.requesterLastName,
  );

  return (
    <article className="rounded-2xl border border-line bg-surface p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-brand">
            {initials}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold text-ink">
              {fullName}
            </h2>

            <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted">
              <Mail className="h-3.5 w-3.5 shrink-0" />

              <span className="truncate">{request.requesterEmail}</span>
            </div>
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      {request.message?.trim() && (
        <div className="mt-4 rounded-xl bg-background px-4 py-3.5">
          <p className="text-xs font-medium text-muted">Message</p>

          <p className="mt-1.5 text-sm leading-6 text-ink">
            “{request.message}”
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Clock3 className="h-3.5 w-3.5" />

          <span>Requested {formatRequestedAt(request.requestedAt)}</span>
        </div>

        {isPending && (
          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => onRespond(request.requestId, false)}
              disabled={isResponding}
              className="flex-1 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <X className="h-4 w-4" />

                {isDeclining ? "Declining..." : "Decline"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onRespond(request.requestId, true)}
              disabled={isResponding}
              className="flex-1 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <Check className="h-4 w-4" />

                {isAccepting ? "Accepting..." : "Accept"}
              </span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = getStatusStyles(status);

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ${styles}`}
    >
      {formatStatus(status)}
    </span>
  );
}

function getStatusStyles(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-amber-50 text-amber-700";

    case "ACCEPTED":
      return "bg-green-50 text-green-700";

    case "DECLINED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-background text-muted";
  }
}

function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatRequestedAt(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat("en-AU", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsedDate);
}

function getInitials(firstName: string, lastName: string) {
  const firstInitial = firstName?.charAt(0) ?? "";
  const lastInitial = lastName?.charAt(0) ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
}
