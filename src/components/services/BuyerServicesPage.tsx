"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { useSearchListings } from "../listing/hooks/useSearchListings";
import { ServiceCard } from "./ui/ServiceCard";

const CITIES = [
  "All cities",
  "Melbourne",
  "Sydney",
  "Brisbane",
  "Adelaide",
  "Perth",
  "Canberra",
];

const CATEGORIES = [
  "All categories",
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
  const [category, setCategory] = useState("All categories");
  const [city, setCity] = useState("All cities");
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const { data, isLoading, isError, error, isFetching } = useSearchListings({
    category: category === "All categories" ? undefined : category,
    city: city === "All cities" ? undefined : city,
    q: searchQuery || undefined,
    page,
    size: pageSize,
  });

  const listings = data?.listings ?? [];

  const hasFilters =
    category !== "All categories" ||
    city !== "All cities" ||
    searchQuery !== "";

  const clearFilters = () => {
    setCategory("All categories");
    setCity("All cities");
    setSearch("");
    setSearchQuery("");
    setPage(1);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
    setPage(1);
  };

  const handleSearch = () => {
    setSearchQuery(search.trim());
    setPage(1);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Page heading */}
        <div>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            Browse services
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Find trusted services from the Bhutanese community in Australia.
          </p>
        </div>

        {/* Loading cards */}
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
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8">
        {/* Page heading */}
        <div>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            Browse services
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Find trusted services from the Bhutanese community in Australia.
          </p>
        </div>

        {/* Error */}
        <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-faint" />

          <h2 className="mt-5 font-serif text-2xl font-medium text-ink">
            We couldn't load the services.
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Something went wrong while loading the community listings. Please
            try again.
          </p>

          {error?.message && (
            <p className="mt-2 text-xs text-muted">{error.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
          Browse services
        </h1>
      </div>

      {/* Filters */}
      <div className="rounded-md border border-line-strong bg-surface p-3 sm:p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Category */}
          <select
            value={category}
            onChange={handleCategoryChange}
            className="h-11 rounded-md border border-line bg-background px-3 text-sm text-ink outline-none transition-colors focus:border-brand"
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* City */}
          <select
            value={city}
            onChange={handleCityChange}
            className="h-11 rounded-md border border-line bg-background px-3 text-sm text-ink outline-none transition-colors focus:border-brand"
          >
            {CITIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="flex min-w-0 flex-1 items-center rounded-md border border-line bg-background px-3 focus-within:border-brand">
            <Search className="h-4 w-4 shrink-0 text-muted" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search services, providers..."
              className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-faint"
            />
          </div>

          {/* Search button */}
          <button
            type="button"
            onClick={handleSearch}
            disabled={isFetching}
            className="h-11 shrink-0 rounded-md bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isFetching ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            <span className="mr-1 text-xs font-medium text-muted">
              Filters:
            </span>

            {category !== "All categories" && (
              <button
                type="button"
                onClick={() => {
                  setCategory("All categories");
                  setPage(1);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
              >
                {category}

                <X className="h-3 w-3" />
              </button>
            )}

            {city !== "All cities" && (
              <button
                type="button"
                onClick={() => {
                  setCity("All cities");
                  setPage(1);
                }}
                className="inline-flex items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
              >
                {city}

                <X className="h-3 w-3" />
              </button>
            )}

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchQuery("");
                  setPage(1);
                }}
                className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
              >
                <span className="max-w-40 truncate">"{searchQuery}"</span>

                <X className="h-3 w-3 shrink-0" />
              </button>
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

        <p className="hidden text-sm text-muted sm:block">
          <span className="font-semibold text-ink">
            {data?.totalElements ?? 0}
          </span>{" "}
          {data?.totalElements === 1 ? "listing" : "listings"}
        </p>
      </div>

      {/* Results */}
      {listings.length > 0 ? (
        <div className="relative">
          {isFetching && (
            <div className="absolute inset-x-0 -top-4 h-0.5 overflow-hidden rounded-full bg-brand/20">
              <div className="h-full w-1/3 animate-pulse bg-brand" />
            </div>
          )}

          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ServiceCard
                key={listing.id}
                listing={listing}
                hrefBase="/buyer-dashboard/services"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
          <Search className="mx-auto h-8 w-8 text-faint" />

          <h3 className="mt-5 font-serif text-2xl font-medium text-ink">
            No services found.
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Try changing your category, city, or search terms to find more
            community listings.
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-md border border-line-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={!data.hasPrevious || isFetching}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-md border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-muted">
            Page{" "}
            <span className="font-semibold text-ink">{data.currentPage}</span>{" "}
            of <span className="font-semibold text-ink">{data.totalPages}</span>
          </span>

          <button
            type="button"
            disabled={!data.hasNext || isFetching}
            onClick={() => setPage((current) => current + 1)}
            className="rounded-md border border-line-strong bg-surface px-4 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
