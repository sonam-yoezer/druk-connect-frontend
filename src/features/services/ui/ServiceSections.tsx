import type { ReactNode } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Eye,
  MapPin,
  Star,
} from "lucide-react";
import Link from "next/link";
import { ListingDetails, ListingReview } from "../../listing/types/listing";
import {
  getPriceLabel,
  formatDate,
  formatAvailability,
  getReviewKey,
} from "../utils/serviceDetail.utils";

export function ServiceBreadcrumb({ listing }: { listing: ListingDetails }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs text-muted"
    >
      <Link
        href="/buyer-dashboard/services"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Browse services
      </Link>

      <span aria-hidden="true">/</span>

      <span>{listing.serviceType}</span>

      <span aria-hidden="true">/</span>

      <span className="max-w-[240px] truncate font-medium text-ink">
        {listing.listingTitle}
      </span>
    </nav>
  );
}

export function ServiceHeader({ listing }: { listing: ListingDetails }) {
  return (
    <section className="mt-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <span className="inline-flex rounded-md bg-brand-tint px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
            {listing.serviceType}
          </span>

          <h1 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-[1.08] tracking-[-0.025em] text-ink sm:text-4xl">
            {listing.listingTitle}
          </h1>
        </div>

        <div className="shrink-0 sm:text-right">
          <div className="font-serif text-3xl font-medium tracking-tight text-ink">
            {getPriceLabel(listing)}
          </div>

          {listing.pricingType === "PAID" && (
            <p className="mt-1 max-w-52 text-xs leading-5 text-muted sm:ml-auto">
              Contact the provider to confirm the final price and booking
              details.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-faint" />
          {listing.city}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="h-3.5 w-3.5 text-faint" />
          Posted {formatDate(listing.createdAt)}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-faint" />
          {listing.views} views
        </span>
      </div>
    </section>
  );
}

export function AboutSection({ description }: { description: string }) {
  return (
    <section className="mt-9 border-t border-line py-7">
      <SectionHeading>About this service</SectionHeading>

      <p className="max-w-2xl text-sm leading-7 text-muted">{description}</p>
    </section>
  );
}

export function ServiceDetailsSection({
  listing,
}: {
  listing: ListingDetails;
}) {
  return (
    <section className="border-t border-line py-7">
      <SectionHeading>Service details</SectionHeading>

      <div className="grid sm:grid-cols-2 sm:gap-x-10">
        <DetailRow label="Cuisine" value={listing.cuisine || "—"} />
        <DetailRow
          label="Minimum order"
          value={String(listing.minimumOrder ?? "—")}
        />
        <DetailRow label="Serves" value={String(listing.serves ?? "—")} />
        <DetailRow
          label="Availability"
          value={formatAvailability(listing.availability)}
        />
        <DetailRow label="Pricing" value={getPriceLabel(listing)} />
      </div>

      {listing.dietaryOptions?.length > 0 && (
        <div className="mt-5">
          <span className="text-sm text-muted">Dietary options</span>

          <div className="mt-2 flex flex-wrap gap-2">
            {listing.dietaryOptions.map((option) => (
              <span
                key={option}
                className="rounded-md border border-line bg-background px-2.5 py-1 text-xs font-medium text-muted"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function AvailabilitySection({ listing }: { listing: ListingDetails }) {
  return (
    <section className="border-t border-line py-7">
      <SectionHeading>Availability</SectionHeading>

      <p className="mb-4 max-w-xl text-sm leading-6 text-muted">
        Availability can vary depending on the size of your order and your
        requirements. Contact the provider to confirm the details before
        booking.
      </p>

      <div className="inline-flex items-center gap-2 rounded-md bg-jade-tint px-3.5 py-2 text-xs font-semibold text-jade">
        <CalendarDays className="h-4 w-4" />
        {formatAvailability(listing.availability)}
      </div>
    </section>
  );
}

export function ReviewsSection({ listing }: { listing: ListingDetails }) {
  return (
    <section className="border-t border-line py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading>Reviews</SectionHeading>

        <RatingSummary
          rating={listing.averageRatingStar}
          reviews={listing.totalReviewer}
        />
      </div>

      {listing.reviews?.length > 0 ? (
        <div className="mt-1 border-t border-line">
          {listing.reviews.map((review, index) => (
            <ReviewCard key={getReviewKey(review, index)} review={review} />
          ))}
        </div>
      ) : (
        <div className="mt-1 border-t border-line py-8">
          <p className="text-sm text-muted">No reviews yet.</p>
        </div>
      )}
    </section>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 font-serif text-xl font-medium tracking-tight text-ink">
      {children}
    </h2>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-line py-3.5">
      <span className="text-sm text-muted">{label}</span>

      <span className="text-right text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}

function RatingSummary({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  return (
    <div className="flex items-center gap-3 pb-4 sm:pb-0">
      <span className="font-serif text-3xl font-medium text-ink">
        {rating > 0 ? rating.toFixed(1) : "—"}
      </span>

      <div>
        <div className="flex items-center gap-0.5 text-brand">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`h-3.5 w-3.5 ${
                index < Math.round(rating) ? "fill-current" : ""
              }`}
            />
          ))}
        </div>

        <p className="mt-1 text-xs text-muted">
          {reviews} {reviews === 1 ? "review" : "reviews"}
        </p>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: ListingReview }) {
  return (
    <article className="border-b border-line py-5 last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-ink">
            {review.reviewerName ?? "Anonymous"}
          </span>

          {typeof review.rating === "number" && (
            <span className="flex items-center gap-0.5 text-brand">
              {Array.from({ length: review.rating }).map((_, index) => (
                <Star key={index} className="h-3 w-3 fill-current" />
              ))}
            </span>
          )}
        </div>

        {review.createdAt && (
          <span className="text-xs text-faint">
            {formatDate(review.createdAt)}
          </span>
        )}
      </div>

      {review.comment && (
        <p className="mt-3 text-sm leading-6 text-muted">{review.comment}</p>
      )}
    </article>
  );
}
