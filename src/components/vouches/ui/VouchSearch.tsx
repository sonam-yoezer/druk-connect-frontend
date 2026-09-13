"use client";

import { Search, UserRound, X } from "lucide-react";

type Member = {
  id: number;
  name: string;
  avatar: string;
  location: string;
};

type VouchSearchProps = {
  search: string;
  results: Member[];
  requestedIds: number[];
  onSearchChange: (value: string) => void;
  onRequest: (memberId: number) => void;
};

export function VouchSearch({
  search,
  results,
  requestedIds,
  onSearchChange,
  onRequest,
}: VouchSearchProps) {
  return (
    <section className="border border-line bg-surface p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
          Build your reputation
        </p>

        <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
          Ask someone to vouch for you
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          Find someone in the community who knows you and send them a vouch
          request.
        </p>
      </div>

      <div className="relative mt-6 max-w-2xl">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by name or location..."
          className="h-11 w-full rounded-md border border-line bg-background pl-10 pr-10 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
        />

        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-ink"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {search && (
        <div className="mt-4 max-w-2xl border-t border-line">
          {results.length > 0 ? (
            results.map((member) => {
              const requested = requestedIds.includes(member.id);

              return (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-4 border-b border-line py-4 last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {member.name}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-muted">
                        {member.location}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={requested}
                    onClick={() => onRequest(member.id)}
                    className={`shrink-0 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${
                      requested
                        ? "bg-jade-tint text-jade"
                        : "border border-line-strong text-ink hover:border-brand hover:text-brand"
                    }`}
                  >
                    {requested ? "Requested" : "Ask to vouch"}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="py-6 text-center">
              <UserRound className="mx-auto h-5 w-5 text-faint" />

              <p className="mt-2 text-sm font-medium text-ink">
                No members found
              </p>

              <p className="mt-1 text-xs text-muted">
                Try searching with a different name or location.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
