"use client";

import { useState } from "react";
import { AlertCircle, Inbox } from "lucide-react";

import { useRespondToVouchRequest } from "../hooks/useRespondToVouchRequest";
import { useIncomingVouchRequests } from "../hooks/useIncomingVouchRequests";
import VouchRequestSkeleton from "./VouchRequestSkeleton";

type RespondingState = {
  requestId: string;
  action: "accept" | "decline";
} | null;

export function IncomingVouchRequests() {
  const {
    data: requests,
    isLoading,
    isError,
    refetch,
  } = useIncomingVouchRequests();

  const { mutate: respondToVouchRequest } = useRespondToVouchRequest();
  const [responding, setResponding] = useState<RespondingState>(null);

  const handleRespond = (requestId: string, accept: boolean) => {
    setResponding({
      requestId,
      action: accept ? "accept" : "decline",
    });

    respondToVouchRequest(
      { requestId, accept },
      {
        onSettled: () => setResponding(null),
      },
    );
  };

  if (isLoading) {
    return <VouchRequestSkeleton />;
  }

  if (isError) {
    return (
      <div className="border border-line rounded-md bg-surface px-6 py-10 text-center">
        <AlertCircle className="mx-auto h-7 w-7 text-muted" />
        <h2 className="mt-3 text-sm font-semibold text-ink">
          Unable to load vouch requests
        </h2>
        <p className="mt-1 text-sm text-muted">
          Something went wrong while loading your requests.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 h-10 rounded-md border border-line px-4 text-sm font-medium text-ink transition-colors hover:bg-background"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="border border-dashed border-line-strong rounded-md bg-surface px-6 py-12 text-center">
        <Inbox className="mx-auto h-8 w-8 text-muted" />
        <h2 className="mt-3 font-serif text-xl font-medium text-ink">
          No vouch requests yet
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Requests from other community members will appear here.
        </p>
      </div>
    );
  }

  const pendingCount = requests.filter(
    (request) => request.status.trim().toUpperCase() === "PENDING",
  ).length;

  return (
    <div className="overflow-hidden border border-line rounded-md bg-surface">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-sm font-semibold text-ink">Incoming requests</h2>
          <p className="mt-1 text-xs text-muted">
            Review and respond to vouch requests.
          </p>
        </div>

        <span className="shrink-0 text-sm text-muted">
          {pendingCount} pending
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed text-left">
          <thead>
            <tr className="border-b border-line bg-background/60">
              <th className="w-[22%] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Member
              </th>
              <th className="w-[38%] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Message
              </th>
              <th className="w-[15%] px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted">
                Status
              </th>
              <th className="w-[25%] px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {requests.map((request) => {
              const isPending =
                request.status.trim().toUpperCase() === "PENDING";
              const isResponding = responding?.requestId === request.requestId;

              return (
                <tr
                  key={request.requestId}
                  className="transition-colors hover:bg-background/50"
                >
                  <td className="px-5 py-4 align-middle">
                    <span className="block truncate text-sm font-medium text-ink">
                      {request.requesterFirstName ?? "Community member"}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <p
                      className="truncate text-sm text-muted"
                      title={request.message ?? ""}
                    >
                      {request.message?.trim() || "No message provided"}
                    </p>
                  </td>

                  <td className="px-4 py-4 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                        isPending
                          ? "bg-brand-tint text-brand"
                          : "bg-background text-muted"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    {isPending ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          disabled={isResponding}
                          onClick={() => handleRespond(request.requestId, true)}
                          className="h-9 rounded-md bg-brand px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isResponding && responding.action === "accept"
                            ? "Accepting..."
                            : "Accept"}
                        </button>

                        <button
                          type="button"
                          disabled={isResponding}
                          onClick={() =>
                            handleRespond(request.requestId, false)
                          }
                          className="h-9 rounded-md border border-line px-3 text-xs font-medium text-ink transition-colors hover:bg-background disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isResponding && responding.action === "decline"
                            ? "Declining..."
                            : "Decline"}
                        </button>
                      </div>
                    ) : (
                      <div className="text-right text-xs text-muted">
                        No action needed
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="border-t border-line px-5 py-3">
        <p className="text-xs text-muted">
          Showing {requests.length}{" "}
          {requests.length === 1 ? "request" : "requests"}
        </p>
      </div>
    </div>
  );
}
