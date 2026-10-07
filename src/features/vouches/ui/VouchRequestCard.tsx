"use client";

import { Check, MapPin, X } from "lucide-react";

type VouchRequestStatus = "PENDING" | "ACCEPTED" | "DECLINED";

type VouchRequest = {
  id: number;
  requesterId: number;
  name: string;
  avatar: string;
  location: string;
  message: string;
  requestedAt: string;
  status: VouchRequestStatus;
};

type VouchRequestCardProps = {
  request: VouchRequest;
  last: boolean;
  onAccept: (requestId: number) => void;
  onDecline: (requestId: number) => void;
};

export function VouchRequestCard({
  request,
  last,
  onAccept,
  onDecline,
}: VouchRequestCardProps) {
  return (
    <article className={`p-6 sm:p-7 ${!last ? "border-b border-line" : ""}`}>
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={request.avatar}
              alt={request.name}
              className="h-11 w-11 shrink-0 rounded-full object-cover"
            />

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-ink">
                {request.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3 w-3 text-faint" />
                <span>{request.location}</span>
              </div>
            </div>
          </div>

          <span className="shrink-0 text-xs text-faint">
            {request.requestedAt}
          </span>
        </div>

        <p className="max-w-2xl text-sm leading-6 text-muted">
          "{request.message}"
        </p>

        <div className="flex flex-col-reverse gap-2 border-t border-line pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onDecline(request.id)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line-strong px-4 text-sm font-semibold text-muted transition-colors hover:border-danger hover:bg-danger-tint hover:text-danger"
          >
            <X className="h-4 w-4" />
            Decline
          </button>

          <button
            type="button"
            onClick={() => onAccept(request.id)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            <Check className="h-4 w-4" />
            Accept & vouch
          </button>
        </div>
      </div>
    </article>
  );
}
