"use client";

import Link from "next/link";
import {
  ArrowRight,
  Search,
  Star,
  BriefcaseBusiness,
  Users,
} from "lucide-react";
import { useBuyerDashboard } from "@/src/features/buyer-dashboard/hooks/useBuyerDashboard";
import type { LucideIcon } from "lucide-react";
import { useListings } from "@/src/features/listing/hooks/useListings";

export default function BuyerDashboardPage() {
  const { data: dashboard, isPending, isError } = useBuyerDashboard();
  const {
    data: listingsData,
    isPending: isListingsPending,
    isError: isListingsError,
  } = useListings(1, 3);

  const recommendedServices = listingsData?.listings ?? [];

  return (
    <div className="space-y-10">
      {/* Header */}

      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Welcome back
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Find trusted services from the Bhutanese community and keep track of
            your activity.
          </p>
        </div>

        <Link
          href="/buyer-dashboard/services"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <Search className="h-4 w-4" />
          Browse services
        </Link>
      </section>

      {/* Stats */}
      <section
        aria-label="Your activity"
        className="grid grid-cols-1 gap-px overflow-hidden border rounded-md border-line bg-line sm:grid-cols-3"
      >
        <BuyerStatCard
          label="Services used"
          value={
            isPending || isError ? "—" : String(dashboard.servicesAvailedCount)
          }
          description="Services you've availed"
          icon={BriefcaseBusiness}
        />

        <BuyerStatCard
          label="Providers"
          value={
            isPending || isError ? "—" : String(dashboard.uniqueProvidersUsed)
          }
          description="Unique providers used"
          icon={Users}
        />

        <BuyerStatCard
          label="Reviews submitted"
          value={
            isPending || isError ? "—" : String(dashboard.submittedReviewCount)
          }
          description="Your submitted reviews"
          icon={Star}
        />
      </section>

      {isError && (
        <p className="text-sm text-red-600" role="alert">
          Unable to load your dashboard statistics. Please try again later.
        </p>
      )}

      {/* Recommended services */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Services you might need
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Explore services from the community.
            </p>
          </div>

          <Link
            href="/buyer-dashboard/services"
            className="inline-flex items-center gap-2 text-sm font-medium"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {isListingsPending ? (
          <p className="text-sm text-gray-500">Loading services...</p>
        ) : isListingsError ? (
          <p className="text-sm text-red-600">
            Unable to load services. Please try again later.
          </p>
        ) : recommendedServices.length === 0 ? (
          <p className="text-sm text-gray-500">
            No services are available right now.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedServices.map((service) => {
              const price =
                service.pricingType === "FREE"
                  ? "Free"
                  : service.rateAmount == null
                    ? "Contact for pricing"
                    : new Intl.NumberFormat("en-AU", {
                        style: "currency",
                        currency: service.currencyCode,
                        maximumFractionDigits: 2,
                      }).format(service.rateAmount);

              return (
                <BuyerServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.listingTitle}
                  category={service.listingCategory}
                  location={`${service.suburb}, ${service.state}`}
                  price={price}
                  priceUnit={service.currencyCode}
                  rating={service.averageRating.toFixed(1)}
                  reviews={service.totalReviewer}
                  image={
                    service.images[0]?.imageUrl
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${service.images[0].imageUrl}`
                      : ""
                  }
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function BuyerStatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
          {label}
        </p>

        <Icon className="h-4 w-4 text-brand" />
      </div>

      <p className="mt-3 font-serif text-3xl font-medium text-ink">{value}</p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}

function BuyerServiceCard({
  id,
  title,
  category,
  location,
  price,
  priceUnit,
  rating,
  reviews,
  image,
}: {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  priceUnit: string;
  rating: string;
  reviews: number;
  image: string;
}) {
  return (
    <Link
      href={`/buyer-dashboard/services/${id}`}
      className="group overflow-hidden border border-line rounded-md bg-surface transition-colors hover:border-brand"
    >
      <div className="aspect-[16/10] overflow-hidden bg-background">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No image available
          </div>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
          {category}
        </p>

        <h3 className="mt-2 font-serif text-xl font-medium text-ink">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted">{location}</p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-ink">{price}</span>

            <span className="ml-1 text-xs text-muted">{priceUnit}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted">
            <Star className="h-3.5 w-3.5 fill-current text-brand" />
            <span className="font-semibold text-ink">{rating}</span>
            <span>({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
