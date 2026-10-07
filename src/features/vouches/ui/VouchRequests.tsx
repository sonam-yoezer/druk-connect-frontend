import { VouchRequestCard } from "./VouchRequestCard";

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

type VouchRequestsProps = {
  requests: VouchRequest[];
  onAccept: (requestId: number) => void;
  onDecline: (requestId: number) => void;
};

export function VouchRequests({
  requests,
  onAccept,
  onDecline,
}: VouchRequestsProps) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Needs your response
          </p>

          <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
            Vouch requests
          </h2>
        </div>

        {requests.length > 0 && (
          <span className="text-xs font-semibold text-brand">
            {requests.length} pending
          </span>
        )}
      </div>

      <div className="mt-5 border border-line bg-surface">
        {requests.length > 0 ? (
          requests.map((request, index) => (
            <VouchRequestCard
              key={request.id}
              request={request}
              last={index === requests.length - 1}
              onAccept={onAccept}
              onDecline={onDecline}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-ink">No pending requests</p>

            <p className="mt-1 text-xs text-muted">
              New vouch requests will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
