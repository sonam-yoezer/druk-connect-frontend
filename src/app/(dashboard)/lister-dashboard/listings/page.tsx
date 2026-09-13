"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Eye,
  MapPin,
  Pencil,
  Plus,
  Search,
  Store,
} from "lucide-react";

type ListingStatus = "ACTIVE" | "DRAFT" | "PAUSED";

type Listing = {
  id: number;
  title: string;
  category: string;
  location: string;
  price: string;
  priceUnit: string;
  views: number;
  status: ListingStatus;
  updated: string;
  image: string;
};

const LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Bhutanese Catering",
    category: "Food",
    location: "Melbourne, VIC",
    price: "$25",
    priceUnit: "per person",
    views: 42,
    status: "ACTIVE",
    updated: "Updated 2 days ago",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80",
  },
  {
    id: 2,
    title: "Airport Pickup",
    category: "Transport",
    location: "Sydney, NSW",
    price: "$40",
    priceUnit: "per trip",
    views: 31,
    status: "ACTIVE",
    updated: "Updated 5 days ago",
    image:
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=900&q=80",
  },
  {
    id: 3,
    title: "Maths & Science Tutoring",
    category: "Tutoring",
    location: "Brisbane, QLD",
    price: "$30",
    priceUnit: "per hour",
    views: 18,
    status: "DRAFT",
    updated: "Created 1 week ago",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
  },
];

const STATUS_OPTIONS = ["All", "Active", "Draft", "Paused"];

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredListings = useMemo(() => {
    return LISTINGS.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(search.toLowerCase()) ||
        listing.category.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" ||
        listing.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Your workspace
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            My listings
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Manage the services you offer to the Bhutanese community in
            Australia.
          </p>
        </div>

        <Link
          href="/dashboard/listings/new"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          Create listing
        </Link>
      </section>

      {/* Toolbar */}
      <section className="border-y border-line py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your listings..."
              className="h-10 w-full rounded-md border border-line bg-surface pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
            />
          </div>

          {/* Status filters */}
          <div className="flex flex-wrap items-center gap-2">
            {STATUS_OPTIONS.map((option) => {
              const active = status === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStatus(option)}
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

      {/* Results heading */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Listings
          </p>

          <h2 className="mt-1 font-serif text-xl font-medium tracking-tight text-ink">
            {filteredListings.length}{" "}
            {filteredListings.length === 1 ? "listing" : "listings"}
          </h2>
        </div>

        <button
          type="button"
          className="hidden items-center gap-1.5 text-xs font-medium text-muted hover:text-ink sm:flex"
        >
          Recently updated
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Listings */}
      {filteredListings.length > 0 ? (
        <div className="overflow-hidden border border-line bg-surface">
          <div className="hidden grid-cols-[minmax(0,2fr)_140px_110px_100px] gap-6 border-b border-line bg-background px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint md:grid">
            <span>Listing</span>
            <span>Status</span>
            <span>Views</span>
            <span className="text-right">Action</span>
          </div>

          <div>
            {filteredListings.map((listing, index) => (
              <ListingRow
                key={listing.id}
                listing={listing}
                last={index === filteredListings.length - 1}
              />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState search={search} />
      )}
    </div>
  );
}

function ListingRow({ listing, last }: { listing: Listing; last: boolean }) {
  return (
    <div className={`group px-5 py-5 ${!last ? "border-b border-line" : ""}`}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_140px_110px_100px] md:items-center md:gap-6">
        {/* Listing */}
        <div className="flex min-w-0 gap-4">
          <div className="h-20 w-24 shrink-0 overflow-hidden rounded-md bg-brand-tint">
            <img
              src={listing.image}
              alt={listing.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
              {listing.category}
            </p>

            <h3 className="mt-1 truncate font-serif text-lg font-medium tracking-tight text-ink">
              {listing.title}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" />
              <span>{listing.location}</span>
            </div>

            <p className="mt-1 text-xs text-faint">{listing.updated}</p>
          </div>
        </div>

        {/* Status */}
        <div>
          <StatusBadge status={listing.status} />
        </div>

        {/* Views */}
        <div className="flex items-center gap-2 text-sm text-muted">
          <Eye className="h-4 w-4 text-faint" />
          {listing.views}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-start gap-2 md:justify-end">
          <Link
            href={`/dashboard/listings/${listing.id}/edit`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-brand-line hover:text-brand"
            aria-label={`Edit ${listing.title}`}
          >
            <Pencil className="h-4 w-4" />
          </Link>

          <Link
            href={`/services/${listing.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-brand-line hover:text-brand"
            aria-label={`View ${listing.title}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Mobile price */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 md:hidden">
        <span className="text-xs text-muted">{listing.priceUnit}</span>

        <span className="text-sm font-semibold text-ink">{listing.price}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ListingStatus }) {
  const styles = {
    ACTIVE: "bg-jade-tint text-jade",
    DRAFT: "bg-background text-muted",
    PAUSED: "bg-danger-tint text-danger",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${styles[status]}`}
    >
      {status.toLowerCase()}
    </span>
  );
}

function EmptyState({ search }: { search: string }) {
  return (
    <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
        <StoreIcon />
      </div>

      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-ink">
        {search ? "No listings found" : "You have no listings yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {search
          ? "Try changing your search or status filter."
          : "Create your first listing and start offering your services to the community."}
      </p>

      {!search && (
        <Link
          href="/dashboard/listings/new"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          Create listing
        </Link>
      )}
    </div>
  );
}

function StoreIcon() {
  return <Store className="h-5 w-5" />;
}
