"use client";

import { useMemo, useState } from "react";
import { Check, Search, ShieldCheck, Star, UserRound, X } from "lucide-react";

type Vouch = {
  id: number;
  name: string;
  avatar: string;
  relationship: string;
  message: string;
  date: string;
  rating: number;
  verified: boolean;
};

type Member = {
  id: number;
  name: string;
  avatar: string;
  location: string;
  relationship: string;
};

type VouchRequest = {
  id: number;
  name: string;
  avatar: string;
  requestedAt: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
};

const VOUCHES: Vouch[] = [
  {
    id: 1,
    name: "Pema Dorji",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    relationship: "Community member",
    message:
      "I've known Tashi for a while and have always found him reliable and easy to deal with. His catering is also excellent.",
    date: "2 weeks ago",
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: "Karma Wangchuk",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    relationship: "Community member",
    message:
      "Very trustworthy and professional. I've used his services several times and would happily recommend him to others.",
    date: "1 month ago",
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: "Sonam Choden",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    relationship: "Community member",
    message:
      "Tashi is dependable and always communicates clearly. A great person to work with.",
    date: "2 months ago",
    rating: 5,
    verified: true,
  },
  {
    id: 4,
    name: "Tshering Lhamo",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    relationship: "Community member",
    message:
      "Friendly, reliable and genuinely helpful. I would definitely recommend him.",
    date: "3 months ago",
    rating: 4,
    verified: true,
  },
];

const MEMBERS: Member[] = [
  {
    id: 1,
    name: "Karma Wangchuk",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    location: "Melbourne, VIC",
    relationship: "Community member",
  },
  {
    id: 2,
    name: "Sonam Choden",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    location: "Brisbane, QLD",
    relationship: "Community member",
  },
  {
    id: 3,
    name: "Pema Dorji",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    location: "Sydney, NSW",
    relationship: "Community member",
  },
];

const VOUCH_REQUESTS: VouchRequest[] = [
  {
    id: 1,
    name: "Karma Wangchuk",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    requestedAt: "2 days ago",
    status: "PENDING",
  },
];

export default function VouchesPage() {
  const [search, setSearch] = useState("");
  const [requestedIds, setRequestedIds] = useState<number[]>([]);

  const searchResults = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return MEMBERS.filter(
      (member) =>
        member.name.toLowerCase().includes(query) ||
        member.location.toLowerCase().includes(query),
    );
  }, [search]);

  function handleRequestVouch(memberId: number) {
    setRequestedIds((current) =>
      current.includes(memberId) ? current : [...current, memberId],
    );
  }

  return (
    <div className="space-y-10">
      <PageHeader />

      <RequestVouch
        search={search}
        onSearchChange={setSearch}
        results={searchResults}
        requestedIds={requestedIds}
        onRequest={handleRequestVouch}
      />

      <ReputationOverview />

      <VouchRequests />

      <HowVouchesWork />

      <RecentVouches />
    </div>
  );
}

function PageHeader() {
  return (
    <section>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
        Your reputation
      </p>

      <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        Vouches
      </h1>

      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
        Build trust in the community by asking people you know to vouch for you
        and see what others say about you.
      </p>
    </section>
  );
}

function RequestVouch({
  search,
  onSearchChange,
  results,
  requestedIds,
  onRequest,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  results: Member[];
  requestedIds: number[];
  onRequest: (memberId: number) => void;
}) {
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
          Search for someone in the community who knows you and send them a
          request to vouch for you.
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
                        {member.location} · {member.relationship}
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

function ReputationOverview() {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
      <div className="border border-line bg-panel p-6 text-panel-fg sm:p-8">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-panel-muted">
              Community reputation
            </p>

            <div className="mt-4 flex items-end gap-3">
              <span className="font-serif text-5xl font-medium tracking-tight">
                4.8
              </span>

              <span className="pb-2 text-sm text-panel-muted">out of 5</span>
            </div>

            <RatingStars rating={5} />

            <p className="mt-3 text-sm text-panel-muted">
              Based on 12 reviews and 4 community vouches
            </p>
          </div>

          <div className="flex items-center gap-3 border-t border-panel-line pt-5 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-jade-tint text-jade">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold">Trusted member</p>

              <p className="mt-0.5 text-xs text-panel-muted">
                Your identity and reputation matter
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-line bg-surface p-6 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
          Your vouches
        </p>

        <div className="mt-5 flex items-end gap-3">
          <span className="font-serif text-4xl font-medium tracking-tight text-ink">
            4
          </span>

          <span className="pb-1.5 text-sm text-muted">community members</span>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-background">
          <div className="h-full w-[80%] rounded-full bg-jade" />
        </div>

        <p className="mt-3 text-xs leading-5 text-muted">
          You're building a strong reputation within the community.
        </p>
      </div>
    </section>
  );
}

function VouchRequests() {
  return (
    <section>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
          Your requests
        </p>

        <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
          Vouch requests
        </h2>
      </div>

      <div className="mt-5 border border-line bg-surface">
        {VOUCH_REQUESTS.length > 0 ? (
          VOUCH_REQUESTS.map((request, index) => (
            <VouchRequestRow
              key={request.id}
              request={request}
              last={index === VOUCH_REQUESTS.length - 1}
            />
          ))
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm font-medium text-ink">
              No vouch requests yet
            </p>

            <p className="mt-1 text-xs text-muted">
              Search for someone above to ask them for a vouch.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function VouchRequestRow({
  request,
  last,
}: {
  request: VouchRequest;
  last: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between ${
        !last ? "border-b border-line" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <img
          src={request.avatar}
          alt={request.name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-ink">{request.name}</p>

          <p className="mt-0.5 text-xs text-muted">
            Requested {request.requestedAt}
          </p>
        </div>
      </div>

      <RequestStatus status={request.status} />
    </div>
  );
}

function RequestStatus({ status }: { status: VouchRequest["status"] }) {
  const styles = {
    PENDING: "bg-background text-muted",
    ACCEPTED: "bg-jade-tint text-jade",
    DECLINED: "bg-danger-tint text-danger",
  };

  const labels = {
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",
  };

  return (
    <span
      className={`inline-flex w-fit items-center rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function HowVouchesWork() {
  return (
    <section className="border border-line bg-surface p-6 sm:p-8">
      <div className="max-w-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
          How it works
        </p>

        <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
          Vouches help people trust you
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          A vouch is a recommendation from another member of the Bhutanese
          community. It helps people feel more confident when choosing your
          services.
        </p>
      </div>

      <div className="mt-7 grid gap-6 border-t border-line pt-7 sm:grid-cols-3">
        <VouchStep
          number="01"
          title="Build connections"
          description="Connect with people in the community through your services and interactions."
        />

        <VouchStep
          number="02"
          title="Ask for a vouch"
          description="Find someone who knows you and send them a request from your dashboard."
        />

        <VouchStep
          number="03"
          title="Grow your reputation"
          description="Accepted vouches become part of your public reputation on DrukConnect."
        />
      </div>
    </section>
  );
}

function RecentVouches() {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Community feedback
          </p>

          <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
            Recent vouches
          </h2>
        </div>

        <span className="text-xs text-muted">{VOUCHES.length} shown</span>
      </div>

      <div className="mt-5 border border-line bg-surface">
        {VOUCHES.map((vouch, index) => (
          <VouchCard
            key={vouch.id}
            vouch={vouch}
            last={index === VOUCHES.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function VouchCard({ vouch, last }: { vouch: Vouch; last: boolean }) {
  return (
    <article className={`p-6 sm:p-7 ${!last ? "border-b border-line" : ""}`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex items-start gap-4">
          <img
            src={vouch.avatar}
            alt={vouch.name}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">{vouch.name}</h3>

              {vouch.verified && (
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-jade-tint text-jade"
                  title="Verified member"
                >
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs text-muted">{vouch.relationship}</p>
          </div>
        </div>

        <div className="flex-1 sm:pl-4">
          <div className="flex flex-wrap items-center gap-3">
            <RatingStars rating={vouch.rating} size="small" />

            <span className="text-[10px] text-faint">{vouch.date}</span>
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
            "{vouch.message}"
          </p>
        </div>
      </div>
    </article>
  );
}

function RatingStars({
  rating,
  size = "default",
}: {
  rating: number;
  size?: "default" | "small";
}) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`${size === "small" ? "h-3.5 w-3.5" : "h-4 w-4"} ${
            index < rating ? "fill-current text-brand" : "text-line-strong"
          }`}
        />
      ))}
    </div>
  );
}

function VouchStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="text-xs font-semibold tracking-[0.1em] text-brand">
        {number}
      </span>

      <h3 className="mt-3 text-sm font-semibold text-ink">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
