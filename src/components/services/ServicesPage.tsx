"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { ServiceCard } from "./ui/ServiceCard";

const CATEGORIES = [
  "All categories",
  "Food",
  "Transport",
  "Home",
  "Tutoring",
  "Beauty",
  "Repairs",
  "Jobs",
];

const CITIES = [
  "All cities",
  "Melbourne",
  "Sydney",
  "Brisbane",
  "Adelaide",
  "Perth",
  "Canberra",
];

const SERVICES = [
  {
    id: 1,
    title: "Bhutanese Catering",
    category: "Food",
    location: "Melbourne, VIC",
    description:
      "Authentic Bhutanese meals prepared for gatherings, celebrations, and private events.",
    price: "$25",
    priceUnit: "per person",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80",
  },
  {
    id: 2,
    title: "Airport Pickup",
    category: "Transport",
    location: "Sydney, NSW",
    description:
      "Reliable airport pickup and drop-off for Bhutanese families and visitors.",
    price: "$40",
    priceUnit: "per trip",
    image:
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=900&q=80",
  },
  {
    id: 3,
    title: "Maths & Science Tutoring",
    category: "Tutoring",
    location: "Brisbane, QLD",
    description:
      "One-on-one tutoring for school students with flexible evening and weekend sessions.",
    price: "$30",
    priceUnit: "per hour",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
  },
  {
    id: 4,
    title: "Home Cleaning",
    category: "Home",
    location: "Melbourne, VIC",
    description:
      "Friendly and reliable home cleaning services for apartments and houses.",
    price: "$45",
    priceUnit: "per hour",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
  },
  {
    id: 5,
    title: "Traditional Hair Styling",
    category: "Beauty",
    location: "Adelaide, SA",
    description:
      "Hair styling and preparation for celebrations, cultural events, and special occasions.",
    price: "$35",
    priceUnit: "per session",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900&q=80",
  },
  {
    id: 6,
    title: "Furniture Assembly",
    category: "Repairs",
    location: "Sydney, NSW",
    description:
      "Help with assembling furniture, shelves, desks, and other household items.",
    price: "$40",
    priceUnit: "per job",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
  },
];

export default function ServicesPage() {
  const [category, setCategory] = useState("All categories");
  const [city, setCity] = useState("All cities");
  const [search, setSearch] = useState("");

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return SERVICES.filter((service) => {
      const matchesCategory =
        category === "All categories" || service.category === category;

      const serviceCity = service.location.split(",")[0];

      const matchesCity = city === "All cities" || serviceCity === city;

      const matchesSearch =
        !query ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query);

      return matchesCategory && matchesCity && matchesSearch;
    });
  }, [category, city, search]);

  const hasFilters =
    category !== "All categories" ||
    city !== "All cities" ||
    search.trim() !== "";

  const clearFilters = () => {
    setCategory("All categories");
    setCity("All cities");
    setSearch("");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Page intro */}
      <section className="relative overflow-hidden border-b border-line">
        {/* Atmosphere */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-brand/5 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-112.5 w-112.5 rounded-full bg-jade/4 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Bhutanese marketplace in Australia
            </p>

            <h1 className="mt-5 font-serif text-[48px] font-medium leading-[0.98] tracking-[-0.045em] text-ink sm:text-[62px]">
              Services for the <span className="text-brand">community.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Find trusted people offering useful services across Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace */}
      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        {/* Filters */}
        <div className="rounded-md border border-line-strong bg-surface p-3 sm:p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Category */}
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
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
              onChange={(event) => setCity(event.target.value)}
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
                placeholder="Search services, providers..."
                className="h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-faint"
              />
            </div>

            {/* Search button */}
            <button
              type="button"
              className="h-11 shrink-0 rounded-md bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Search
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
                  onClick={() => setCategory("All categories")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
                >
                  {category}
                  <X className="h-3 w-3" />
                </button>
              )}

              {city !== "All cities" && (
                <button
                  type="button"
                  onClick={() => setCity("All cities")}
                  className="inline-flex items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
                >
                  {city}
                  <X className="h-3 w-3" />
                </button>
              )}

              {search.trim() && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="inline-flex max-w-full items-center gap-1.5 rounded-md bg-brand-tint px-2.5 py-1.5 text-xs font-medium text-brand"
                >
                  <span className="max-w-40 truncate">"{search.trim()}"</span>
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
        <div className="mt-10 flex items-end justify-between gap-6">
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
              {filteredServices.length}
            </span>{" "}
            {filteredServices.length === 1 ? "listing" : "listings"}
          </p>
        </div>
        {/* Results */}
        {filteredServices.length > 0 ? (
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
            <Search className="mx-auto h-8 w-8 text-faint" />

            <h3 className="mt-5 font-serif text-2xl font-medium text-ink">
              No services found.
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
              Try changing your category, city, or search terms to find more
              community listings.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-md border border-line-strong bg-surface px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
