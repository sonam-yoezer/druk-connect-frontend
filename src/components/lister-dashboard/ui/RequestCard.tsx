import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type RequestCardProps = {
  name: string;
  listing: string;
  message: string;
  time: string;
};

export function RequestCard({
  name,
  listing,
  message,
  time,
}: RequestCardProps) {
  return (
    <div className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-xs font-semibold text-brand">
        {name.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink">{name}</p>

            <p className="mt-0.5 text-xs text-muted">Interested in {listing}</p>
          </div>

          <span className="shrink-0 text-xs text-faint">{time}</span>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
          {message}
        </p>

        <Link
          href="/dashboard/requests"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand hover:text-brand-dark"
        >
          View request
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
