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
  Trash2,
} from "lucide-react";

import { useMyListings } from "@/src/components/listing/hooks/useMyListings";
import type { Listing } from "@/src/components/listing/types/listing";
import { useDeleteListing } from "@/src/components/listing/hooks/useDeleteListing";
import { useUpdateListing } from "@/src/components/listing/hooks/useUpdateListing";
import { EditListingModal } from "@/src/components/listing/ui/EditListingModal";

const STATUS_OPTIONS = ["All", "Active", "Draft", "Paused"];

export default function ListingsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [deletingListingId, setDeletingListingId] = useState<string | null>(
    null,
  );
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  const updateListingMutation = useUpdateListing();

  const { data, isLoading, isError } = useMyListings();

  const deleteListingMutation = useDeleteListing();

  const listings = data?.listings ?? [];

  const filteredListings = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesSearch =
        !normalizedSearch ||
        listing.listingTitle.toLowerCase().includes(normalizedSearch) ||
        listing.listingCategory.toLowerCase().includes(normalizedSearch) ||
        listing.city.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        status === "All" ||
        listing.status.toLowerCase() === status.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [listings, search, status]);

  function handleDelete(listing: Listing) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${listing.listingTitle}"? This action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setDeletingListingId(listing.id);

    deleteListingMutation.mutate(listing.id, {
      onSettled: () => {
        setDeletingListingId(null);
      },
    });
  }

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
          href="/lister-dashboard/listings/new"
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
            {isLoading
              ? "Loading..."
              : `${filteredListings.length} ${
                  filteredListings.length === 1 ? "listing" : "listings"
                }`}
          </h2>
        </div>

        {!isLoading && filteredListings.length > 1 && (
          <button
            type="button"
            className="hidden items-center gap-1.5 text-xs font-medium text-muted hover:text-ink sm:flex"
          >
            Recently updated
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <ListingsLoading />
      ) : isError ? (
        <ErrorState />
      ) : filteredListings.length > 0 ? (
        <ListingsTable
          listings={filteredListings}
          deletingListingId={deletingListingId}
          onDelete={handleDelete}
          onEdit={setEditingListing}
        />
      ) : (
        <EmptyState search={search} hasListings={listings.length > 0} />
      )}

      {editingListing && (
        <EditListingModal
          listing={editingListing}
          isUpdating={updateListingMutation.isPending}
          onClose={() => {
            if (!updateListingMutation.isPending) {
              setEditingListing(null);
            }
          }}
          onSubmit={(data) => {
            updateListingMutation.mutate(
              {
                listingId: editingListing.id,
                data,
              },
              {
                onSuccess: () => {
                  setEditingListing(null);
                },
              },
            );
          }}
        />
      )}
    </div>
  );
}

function ListingsTable({
  listings,
  deletingListingId,
  onDelete,
  onEdit,
}: {
  listings: Listing[];
  deletingListingId: string | null;
  onDelete: (listing: Listing) => void;
  onEdit: (listing: Listing) => void;
}) {
  return (
    <div className="overflow-hidden border border-line bg-surface">
      {/* Table header */}
      <div className="hidden grid-cols-[minmax(0,2fr)_140px_110px_100px] gap-6 border-b border-line bg-background px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-faint md:grid">
        <span>Listing</span>
        <span>Status</span>
        <span>Views</span>
        <span className="text-right">Action</span>
      </div>

      {/* Rows */}
      <div>
        {listings.map((listing, index) => (
          <ListingRow
            key={listing.id}
            listing={listing}
            last={index === listings.length - 1}
            onDelete={onDelete}
            onEdit={onEdit}
            isDeleting={deletingListingId === listing.id}
          />
        ))}
      </div>
    </div>
  );
}

function ListingRow({
  listing,
  last,
  onDelete,
  onEdit,
  isDeleting,
}: {
  listing: Listing;
  last: boolean;
  onDelete: (listing: Listing) => void;
  onEdit: (listing: Listing) => void;
  isDeleting: boolean;
}) {
  return (
    <div className={`group px-5 py-5 ${!last ? "border-b border-line" : ""}`}>
      <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_140px_110px_100px] md:items-center md:gap-6">
        {/* Listing */}
        <div className="flex min-w-0 gap-4">
          <ListingImage listing={listing} />

          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
              {listing.listingCategory}
            </p>

            <h3 className="mt-1 truncate font-serif text-lg font-medium tracking-tight text-ink">
              {listing.listingTitle}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" />
              <span>{listing.city}</span>
            </div>

            <p className="mt-1 text-xs text-faint">
              Updated {formatDate(listing.updatedAt)}
            </p>
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
          <button
            type="button"
            onClick={() => onEdit(listing)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-brand-line hover:text-brand"
            aria-label={`Edit ${listing.listingTitle}`}
          >
            <Pencil className="h-4 w-4" />
          </button>

          <Link
            href={`/services/${listing.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-brand-line hover:text-brand"
            aria-label={`View ${listing.listingTitle}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => onDelete(listing)}
            disabled={isDeleting}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-danger hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={`Delete ${listing.listingTitle}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile metadata */}
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4 md:hidden">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted">{formatPricing(listing)}</span>

          <span className="text-xs text-faint">{listing.serviceType}</span>
        </div>

        <span className="text-xs text-faint">
          {listing.totalReviewer}{" "}
          {listing.totalReviewer === 1 ? "review" : "reviews"}
        </span>
      </div>
    </div>
  );
}

function ListingImage({ listing }: { listing: Listing }) {
  const image = listing.images[0];

  if (!image) {
    return (
      <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-md bg-brand-tint text-brand">
        <Store className="h-5 w-5" />
      </div>
    );
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${image.imageUrl}`;

  return (
    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-md bg-brand-tint">
      <img
        src={imageUrl}
        alt={listing.listingTitle}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const normalizedStatus = status.toUpperCase();

  const styles: Record<string, string> = {
    ACTIVE: "bg-jade-tint text-jade",
    DRAFT: "bg-background text-muted",
    PAUSED: "bg-danger-tint text-danger",
  };

  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${
        styles[normalizedStatus] ?? "bg-background text-muted"
      }`}
    >
      {status.toLowerCase()}
    </span>
  );
}

function ListingsLoading() {
  return (
    <div className="overflow-hidden border border-line bg-surface">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse px-5 py-5 ${
            index !== 2 ? "border-b border-line" : ""
          }`}
        >
          <div className="flex gap-4">
            <div className="h-20 w-24 shrink-0 rounded-md bg-background" />

            <div className="flex-1 space-y-3">
              <div className="h-3 w-24 rounded bg-background" />
              <div className="h-5 w-48 rounded bg-background" />
              <div className="h-3 w-28 rounded bg-background" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-danger-tint text-danger">
        <Store className="h-5 w-5" />
      </div>

      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-ink">
        Unable to load listings
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        Something went wrong while loading your listings. Please try again.
      </p>
    </div>
  );
}

function EmptyState({
  search,
  hasListings,
}: {
  search: string;
  hasListings: boolean;
}) {
  const hasFilters = Boolean(search.trim());

  return (
    <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand">
        <Store className="h-5 w-5" />
      </div>

      <h3 className="mt-5 font-serif text-xl font-medium tracking-tight text-ink">
        {hasFilters
          ? "No listings found"
          : hasListings
            ? "No matching listings"
            : "You have no listings yet"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {hasFilters
          ? "Try changing your search or status filter."
          : hasListings
            ? "Try changing your status filter to find your listings."
            : "Create your first listing and start offering your services to the community."}
      </p>

      {!hasFilters && !hasListings && (
        <Link
          href="/lister-dashboard/listings/new"
          className="mt-6 inline-flex h-10 items-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          Create listing
        </Link>
      )}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatPricing(listing: Listing) {
  if (listing.pricingType === "FREE") {
    return "Free";
  }

  if (listing.rateAmount === null) {
    return "Price not specified";
  }

  return `${listing.currencyCode} ${listing.rateAmount}`;
}
