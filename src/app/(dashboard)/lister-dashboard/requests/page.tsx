"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Clock3,
  MapPin,
  MessageSquare,
  Search,
  UserRound,
  X,
} from "lucide-react";

type RequestStatus = "NEW" | "ACCEPTED" | "DECLINED";

type Request = {
  id: number;
  name: string;
  initials: string;
  listing: string;
  location: string;
  message: string;
  date: string;
  status: RequestStatus;
  avatar: string;
  details: {
    dateNeeded: string;
    people: string;
    budget: string;
  };
};

const REQUESTS: Request[] = [
  {
    id: 1,
    name: "Pema Dorji",
    initials: "PD",
    listing: "Bhutanese Catering",
    location: "Melbourne, VIC",
    message:
      "Hi, I need catering for around 30 people for a family gathering next weekend. We would love some traditional Bhutanese dishes if possible.",
    date: "2h ago",
    status: "NEW",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    details: {
      dateNeeded: "Saturday, 20 September",
      people: "Around 30 people",
      budget: "$25–$35 per person",
    },
  },
  {
    id: 2,
    name: "Karma Wangchuk",
    initials: "KW",
    listing: "Airport Pickup",
    location: "Sydney, NSW",
    message:
      "Would you be available for an airport pickup from Sydney Airport this Saturday? My flight arrives around 6:30 PM.",
    date: "Yesterday",
    status: "NEW",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    details: {
      dateNeeded: "Saturday, 20 September",
      people: "1 passenger",
      budget: "$40",
    },
  },
  {
    id: 3,
    name: "Sonam Choden",
    initials: "SC",
    listing: "Maths & Science Tutoring",
    location: "Brisbane, QLD",
    message:
      "I'm looking for weekly tutoring for my younger brother who is currently in Year 10. Are you available on weekday evenings?",
    date: "3 days ago",
    status: "ACCEPTED",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    details: {
      dateNeeded: "Weekday evenings",
      people: "1 student",
      budget: "$30 per hour",
    },
  },
  {
    id: 4,
    name: "Tshering Lhamo",
    initials: "TL",
    listing: "Bhutanese Catering",
    location: "Melbourne, VIC",
    message:
      "Hi, I'm planning a small birthday celebration and wanted to ask about your catering options.",
    date: "5 days ago",
    status: "DECLINED",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    details: {
      dateNeeded: "Sunday, 28 September",
      people: "15 people",
      budget: "$20–$30 per person",
    },
  },
];

const FILTERS = ["All", "New", "Accepted", "Declined"];

export default function RequestsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(1);
  const [search, setSearch] = useState("");

  const filteredRequests = useMemo(() => {
    return REQUESTS.filter((request) => {
      const matchesFilter =
        filter === "All" ||
        request.status.toLowerCase() === filter.toLowerCase();

      const matchesSearch =
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.listing.toLowerCase().includes(search.toLowerCase()) ||
        request.location.toLowerCase().includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [filter, search]);

  const selectedRequest =
    filteredRequests.find((request) => request.id === selectedId) ??
    filteredRequests[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          Activity
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Requests
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          Review enquiries from people interested in your services and respond
          to requests from the community.
        </p>
      </section>

      {/* Toolbar */}
      <section className="border-y border-line py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search requests..."
              className="h-10 w-full rounded-md border border-line bg-surface pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((option) => {
              const active = filter === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-brand text-white"
                      : "text-muted hover:bg-background hover:text-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requests workspace */}
      {filteredRequests.length > 0 ? (
        <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* Request list */}
          <div className="overflow-hidden border border-line bg-surface">
            <div className="border-b border-line px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
                    Inbox
                  </p>

                  <h2 className="mt-1 font-serif text-lg font-medium tracking-tight text-ink">
                    {filteredRequests.length} requests
                  </h2>
                </div>

                <span className="text-xs text-muted">
                  {
                    REQUESTS.filter((request) => request.status === "NEW")
                      .length
                  }{" "}
                  new
                </span>
              </div>
            </div>

            <div>
              {filteredRequests.map((request) => (
                <RequestListItem
                  key={request.id}
                  request={request}
                  selected={request.id === selectedRequest?.id}
                  onClick={() => setSelectedId(request.id)}
                />
              ))}
            </div>
          </div>

          {/* Request details */}
          {selectedRequest && <RequestDetails request={selectedRequest} />}
        </section>
      ) : (
        <EmptyState search={search} />
      )}
    </div>
  );
}

function RequestListItem({
  request,
  selected,
  onClick,
}: {
  request: Request;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border-b border-line px-5 py-5 text-left transition-colors last:border-b-0 ${
        selected ? "bg-brand-tint" : "bg-surface hover:bg-background"
      }`}
    >
      <div className="flex gap-3.5">
        <img
          src={request.avatar}
          alt={request.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {request.name}
              </p>

              <p className="mt-0.5 truncate text-xs text-brand">
                {request.listing}
              </p>
            </div>

            <span className="shrink-0 text-[10px] text-faint">
              {request.date}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
            {request.message}
          </p>

          <div className="mt-3 flex items-center gap-1.5">
            <StatusBadge status={request.status} />
          </div>
        </div>
      </div>
    </button>
  );
}

function RequestDetails({ request }: { request: Request }) {
  const isNew = request.status === "NEW";

  return (
    <div className="border border-line bg-surface">
      {/* Details header */}
      <div className="border-b border-line p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-4">
            <img
              src={request.avatar}
              alt={request.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover"
            />

            <div>
              <h2 className="font-serif text-2xl font-medium tracking-tight text-ink">
                {request.name}
              </h2>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                <UserRound className="h-3.5 w-3.5 text-faint" />
                Interested in{" "}
                <span className="font-medium text-ink">{request.listing}</span>
              </div>
            </div>
          </div>

          <StatusBadge status={request.status} />
        </div>
      </div>

      {/* Message */}
      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
          Message
        </p>

        <div className="mt-3 border-l-2 border-brand-line pl-4">
          <p className="text-sm leading-7 text-muted">{request.message}</p>
        </div>
      </div>

      {/* Request details */}
      <div className="border-t border-line p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
          Request details
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <DetailItem
            label="Date needed"
            value={request.details.dateNeeded}
            icon={<Clock3 className="h-4 w-4" />}
          />

          <DetailItem
            label="People"
            value={request.details.people}
            icon={<UserRound className="h-4 w-4" />}
          />

          <DetailItem
            label="Budget"
            value={request.details.budget}
            icon={<span className="text-sm">$</span>}
          />
        </div>

        <div className="mt-5 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-faint" />
          {request.location}
        </div>
      </div>

      {/* Actions */}
      <div className="border-t border-line bg-background p-6">
        {isNew ? (
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              <MessageSquare className="h-4 w-4" />
              Reply to request
            </button>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-line-strong bg-surface px-4 text-sm font-semibold text-muted transition-colors hover:border-danger hover:text-danger"
            >
              <X className="h-4 w-4" />
              Decline
            </button>
          </div>
        ) : request.status === "ACCEPTED" ? (
          <button
            type="button"
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-line-strong bg-surface px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <MessageSquare className="h-4 w-4" />
            Open conversation
          </button>
        ) : (
          <p className="text-center text-xs text-faint">
            This request has been declined.
          </p>
        )}
      </div>
    </div>
  );
}

function DetailItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-faint">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const styles = {
    NEW: "bg-brand-tint text-brand",
    ACCEPTED: "bg-jade-tint text-jade",
    DECLINED: "bg-danger-tint text-danger",
  };

  const labels = {
    NEW: "New",
    ACCEPTED: "Accepted",
    DECLINED: "Declined",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
        <MessageSquare className="h-5 w-5" />
      </div>

      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-ink">
        {search ? "No requests found" : "No requests yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {search
          ? "Try changing your search or status filter."
          : "When someone contacts you about one of your listings, their request will appear here."}
      </p>
    </div>
  );
}
