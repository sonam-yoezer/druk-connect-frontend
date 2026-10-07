"use client";

import { useState } from "react";
import { Check, Clock3, Mail, UserRound, X } from "lucide-react";

import { useRespondToVouchRequest } from "../hooks/useRespondToVouchRequest";
import { useIncomingVouchRequests } from "../hooks/useIncomingVouchRequests";

function formatRequestedAt(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function IncomingVouchRequests() {
  const { data: requests, isLoading, isError } = useIncomingVouchRequests();

  const { mutate: respondToVouchRequest } = useRespondToVouchRequest();

  const [respondingRequestId, setRespondingRequestId] = useState<string | null>(
    null,
  );

  const [respondingAction, setRespondingAction] = useState<
    "accept" | "decline" | null
  >(null);

  const handleRespond = (requestId: string, accept: boolean) => {
    setRespondingRequestId(requestId);
    setRespondingAction(accept ? "accept" : "decline");

    respondToVouchRequest(
      {
        requestId,
        accept,
      },
      {
        onSettled: () => {
          setRespondingRequestId(null);
          setRespondingAction(null);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-line bg-surface p-5"
          >
            <div className="h-5 w-40 rounded bg-line" />
            <div className="mt-3 h-4 w-56 rounded bg-line" />
            <div className="mt-5 h-16 rounded-xl bg-line" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <p className="text-sm font-medium text-ink">Unable to load requests</p>

        <p className="mt-1 text-sm text-muted">Please try again in a moment.</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-10 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-background text-muted">
          <UserRound className="h-5 w-5" />
        </div>

        <h2 className="mt-4 text-sm font-semibold text-ink">
          No vouch requests yet
        </h2>

        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-muted">
          When another member asks you to vouch for them, their request will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => {
        const fullName = `${request.requesterFirstName} ${request.requesterLastName}`;

        const isPending = request.status.trim().toUpperCase() === "PENDING";

        const isResponding = respondingRequestId === request.requestId;

        const isAccepting = isResponding && respondingAction === "accept";

        const isDeclining = isResponding && respondingAction === "decline";

        return (
          <article
            key={request.requestId}
            className="rounded-2xl border border-line bg-surface p-5"
          >
            {/* Requester */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-tint text-sm font-semibold text-brand">
                  {request.requesterFirstName.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0">
                  <h2 className="truncate text-sm font-semibold text-ink">
                    {fullName}
                  </h2>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <Mail className="h-3.5 w-3.5" />

                    <span className="truncate">{request.requesterEmail}</span>
                  </div>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-background px-2.5 py-1 text-[11px] font-medium text-muted">
                {request.status}
              </span>
            </div>

            {/* Message */}
            {request.message && (
              <div className="mt-4 rounded-xl bg-background p-4">
                <p className="text-sm leading-6 text-ink">
                  “{request.message}”
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <Clock3 className="h-3.5 w-3.5" />

                <span>Requested {formatRequestedAt(request.requestedAt)}</span>
              </div>

              {/* Actions */}
              {isPending && (
                <div className="flex w-full gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleRespond(request.requestId, false)}
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
                    onClick={() => handleRespond(request.requestId, true)}
                    disabled={isResponding}
                    className="flex-1 rounded-xl border border-brand bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
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
      })}
    </div>
  );
}
