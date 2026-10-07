"use client";

import { useState } from "react";
import { AlertCircle, Inbox } from "lucide-react";

import { useRespondToVouchRequest } from "../hooks/useRespondToVouchRequest";
import { useIncomingVouchRequests } from "../hooks/useIncomingVouchRequests";
import VouchRequestCard from "./VouchRequestCard";
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
    const action = accept ? "accept" : "decline";

    setResponding({
      requestId,
      action,
    });

    respondToVouchRequest(
      {
        requestId,
        accept,
      },
      {
        onSettled: () => {
          setResponding(null);
        },
      },
    );
  };

  if (isLoading) {
    return <VouchRequestSkeleton />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-line bg-surface px-6 py-10 text-center">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-red-50 text-red-600">
          <AlertCircle className="h-5 w-5" />
        </div>

        <h2 className="mt-4 text-sm font-semibold text-ink">
          Unable to load vouch requests
        </h2>

        <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-muted">
          Something went wrong while loading your requests. Please try again.
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-5 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-background"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface px-6 py-12 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-background text-muted">
          <Inbox className="h-5 w-5" />
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

  const pendingRequests = requests.filter(
    (request) => request.status.trim().toUpperCase() === "PENDING",
  );

  return (
    <div className="space-y-4">
      {pendingRequests.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3">
          <div>
            <p className="text-sm font-medium text-ink">
              {pendingRequests.length} pending{" "}
              {pendingRequests.length === 1 ? "request" : "requests"}
            </p>

            <p className="mt-0.5 text-xs text-muted">
              Review these requests and decide whether you can vouch for them.
            </p>
          </div>

          <span className="grid h-8 min-w-8 place-items-center rounded-full bg-brand-tint px-2 text-xs font-semibold text-brand">
            {pendingRequests.length}
          </span>
        </div>
      )}

      <div className="space-y-3">
        {requests.map((request) => (
          <VouchRequestCard
            key={request.requestId}
            request={request}
            responding={responding}
            onRespond={handleRespond}
          />
        ))}
      </div>
    </div>
  );
}
