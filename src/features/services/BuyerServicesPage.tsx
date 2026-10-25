"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchListings } from "../listing/hooks/useSearchListings";
import { ServiceCard } from "./ui/ServiceCard";

const ALL_CATEGORIES = "All categories";
const ALL_CITIES = "All cities";
const PAGE_SIZE = 10;

const CITIES = [
  ALL_CITIES,
  "Melbourne",
  "Sydney",
  "Brisbane",
  "Adelaide",
  "Perth",
  "Canberra",
];

const CATEGORIES = [
  ALL_CATEGORIES,
  "Food & Catering",
  "Tax & Accounting",
  "Moving & Relocation",
  "Childcare",
  "Tutoring",
  "Automotive",
  "Hair & Beauty",
  "Resume & Career",
  "Airport Pickup",
];

export default function BuyerServicesPage() {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [city, setCity] = useState(ALL_CITIES);
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error, isFetching, isPlaceholderData } =
    useSearchListings({
      category: category === ALL_CATEGORIES ? undefined : category,
      city: city === ALL_CITIES ? undefined : city,
      q: searchQuery || undefined,
      page,
      size: PAGE_SIZE,
    });

  const isUpdating = isFetching && isPlaceholderData;

  const listings = data?.listings ?? [];
  const total = data?.totalElements ?? 0;

  const hasFilters =
    category !== ALL_CATEGORIES || city !== ALL_CITIES || searchQuery !== "";

  const clearFilters = () => {
    setCategory(ALL_CATEGORIES);
    setCity(ALL_CITIES);
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };

  const handleSearch = () => {
    setSearchQuery(search.trim());
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Page heading — identical in every state, so no layout jump */}
      <div>
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Browse services
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Find trusted services from the Bhutanese community in Australia.
        </p>
      </div>

      {/* Filters — always mounted */}
      <div className="rounded-md border border-line-strong bg-surface p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <FilterSelect
            value={category}
            options={CATEGORIES}
            onChange={(value) => {
              setCategory(value);
              setPage(1);
            }}
          />

          <FilterSelect
            value={city}
            options={CITIES}
            onChange={(value) => {
              setCity(value);
              setPage(1);
            }}
          />

          <div className="flex min-w-0 flex-1 items-center rounded-md border border-line bg-background px-3 focus-within:border-brand">
            <Search className="h-4 w-4 shrink-0 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleSearch();
              }}
              placeholder="Search services, providers..."
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-faint"
            />
          </div>

          <button
            type="button"
            onClick={handleSearch}
            className="h-11 shrink-0 rounded-md bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Search
          </button>
        </div>

        {hasFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <span className="mr-1 text-xs font-medium text-muted">
              Filters:
            </span>

            {category !== ALL_CATEGORIES && (
              <FilterChip
                label={category}
                onRemove={() => {
                  setCategory(ALL_CATEGORIES);
                  setPage(1);
                }}
              />
            )}

            {city !== ALL_CITIES && (
              <FilterChip
                label={city}
                onRemove={() => {
                  setCity(ALL_CITIES);
                  setPage(1);
                }}
              />
            )}

            {searchQuery && (
              <FilterChip
                label={`"${searchQuery}"`}
                onRemove={() => {
                  setSearch("");
                  setSearchQuery("");
                  setPage(1);
                }}
              />
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="ml-auto text-xs font-medium text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results heading */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Community listings
          </p>
          <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            Find what you need.
          </h2>
        </div>

        {!isLoading && !isError && (
          <p className="hidden text-sm text-muted sm:block">
            <span className="font-semibold text-ink">{total}</span>{" "}
            {total === 1 ? "listing" : "listings"}
          </p>
        )}
      </div>

      {/* Results — the only part that changes between states */}
      {isLoading ? (
        <ResultsSkeleton />
      ) : isError ? (
        <EmptyState
          title="We couldn't load the services."
          description="Something went wrong while loading the community listings. Please try again."
          detail={error?.message}
        />
      ) : listings.length > 0 ? (
        <div
          aria-busy={isUpdating}
          className={`grid items-stretch gap-5 transition-opacity duration-200 sm:grid-cols-2 lg:grid-cols-3 ${
            isUpdating ? "opacity-60" : "opacity-100"
          }`}
        >
          {listings.map((listing) => (
            <ServiceCard
              key={listing.id}
              listing={listing}
              hrefBase="/buyer-dashboard/services"
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No services found."
          description="Try changing your category, city, or search terms to find more community listings."
          action={
            hasFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-md border border-line-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                Clear filters
              </button>
            ) : null
          }
        />
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <PageButton
            disabled={!data.hasPrevious || isUpdating}
            onClick={() => setPage((current) => current - 1)}
          >
            Previous
          </PageButton>

          <span className="text-sm text-muted">
            Page{" "}
            <span className="font-semibold text-ink">{data.currentPage}</span>{" "}
            of <span className="font-semibold text-ink">{data.totalPages}</span>
          </span>

          <PageButton
            disabled={!data.hasNext || isUpdating}
            onClick={() => setPage((current) => current + 1)}
          >
            Next
          </PageButton>
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-11 rounded-md border border-line bg-background px-3 text-sm text-ink outline-none transition-colors focus:border-brand"
    >
      {options.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
    >
      <span className="max-w-40 truncate">{label}</span>
      <X className="h-3 w-3 shrink-0" />
    </button>
  );
}

function PageButton({
  disabled,
  onClick,
  children,
}: {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-md border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function ResultsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-md border border-line bg-surface"
        >
          <div className="aspect-[4/3] animate-pulse bg-line/40" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-24 animate-pulse rounded bg-line/50" />
            <div className="h-6 w-3/4 animate-pulse rounded bg-line/50" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-line/50" />
            <div className="h-4 w-1/3 animate-pulse rounded bg-line/50" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  title,
  description,
  detail,
  action,
}: {
  title: string;
  description: string;
  detail?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
      <Search className="mx-auto h-8 w-8 text-faint" />
      <h3 className="mt-5 font-serif text-2xl font-medium text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        {description}
      </p>
      {detail && <p className="mt-2 text-xs text-muted">{detail}</p>}
      {action}
    </div>
  );
}
