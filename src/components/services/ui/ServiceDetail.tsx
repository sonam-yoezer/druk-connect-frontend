"use client";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  Eye,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  ListingDetails,
  ListingImage,
  ListingReview,
} from "../../listing/types/listing";

type ServiceDetailProps = {
  listing: ListingDetails;
};

export function ServiceDetail({ listing }: ServiceDetailProps) {
  const [activeImage, setActiveImage] = useState(0);

  const images = listing.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pb-24 lg:pt-32">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-muted"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Services
          </Link>

          <span aria-hidden="true">/</span>

          <span>{listing.serviceType}</span>

          <span aria-hidden="true">/</span>

          <span className="max-w-[240px] truncate font-medium text-ink">
            {listing.listingTitle}
          </span>
        </nav>

        <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:gap-12">
          {/* Main content */}
          <div className="min-w-0">
            <ServiceGallery
              images={images}
              title={listing.listingTitle}
              activeImage={activeImage}
              onImageChange={setActiveImage}
            />

            {/* Listing header */}
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

                <PriceBlock listing={listing} />
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

            {/* About */}
            <section className="mt-9 border-t border-line py-7">
              <SectionHeading>About this service</SectionHeading>

              <p className="max-w-2xl text-sm leading-7 text-muted">
                {listing.description}
              </p>
            </section>

            {/* Details */}
            <section className="border-t border-line py-7">
              <SectionHeading>Service details</SectionHeading>

              <div className="grid sm:grid-cols-2 sm:gap-x-10">
                <DetailRow label="Cuisine" value={listing.cuisine} />

                <DetailRow
                  label="Minimum order"
                  value={String(listing.minimumOrder)}
                />

                <DetailRow label="Serves" value={String(listing.serves)} />

                <DetailRow
                  label="Availability"
                  value={formatAvailability(listing.availability)}
                />

                <DetailRow
                  label="Pricing"
                  value={
                    listing.pricingType === "FREE"
                      ? "Free"
                      : `${listing.currencyCode} ${listing.rateAmount?.toFixed(2) ?? "Contact provider"}`
                  }
                />
              </div>

              {listing.dietaryOptions.length > 0 && (
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

            {/* Availability */}
            <section className="border-t border-line py-7">
              <SectionHeading>Availability</SectionHeading>

              <p className="mb-4 max-w-xl text-sm leading-6 text-muted">
                Availability can vary depending on the size of your order and
                your requirements. Contact the provider to confirm the details
                before booking.
              </p>

              <div className="inline-flex items-center gap-2 rounded-md bg-jade-tint px-3.5 py-2 text-xs font-semibold text-jade">
                <CalendarDays className="h-4 w-4" />
                {formatAvailability(listing.availability)}
              </div>
            </section>

            {/* Reviews */}
            <section className="border-t border-line py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading>Reviews</SectionHeading>

                <RatingSummary
                  rating={listing.averageRatingStar}
                  reviews={listing.totalReviewer}
                />
              </div>

              {listing.reviews.length > 0 ? (
                <div className="mt-1 border-t border-line">
                  {listing.reviews.map((review, index) => (
                    <ReviewCard
                      key={getReviewKey(review, index)}
                      review={review}
                    />
                  ))}
                </div>
              ) : (
                <div className="mt-1 border-t border-line py-8">
                  <p className="text-sm text-muted">No reviews yet.</p>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <ProviderCard listing={listing} />

            <div className="mt-4 rounded-md border border-line bg-brand-tint/50 p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />

                <div>
                  <h3 className="text-sm font-semibold text-ink">
                    Before you book
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    Confirm the service details, price, dietary requirements,
                    availability, and booking details directly with the provider
                    before making payment.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function ServiceGallery({
  images,
  title,
  activeImage,
  onImageChange,
}: {
  images: ListingImage[];
  title: string;
  activeImage: number;
  onImageChange: (index: number) => void;
}) {
  const imageUrls = images.map((image) => getImageUrl(image.imageUrl));

  if (!imageUrls.length) {
    return <div className="aspect-[16/9] rounded-md bg-brand-tint" />;
  }

  const safeActiveImage = activeImage < imageUrls.length ? activeImage : 0;

  return (
    <div>
      {/* Desktop gallery */}
      <div className="hidden aspect-[16/8.5] gap-2 sm:grid sm:grid-cols-[2fr_1fr]">
        <GalleryImage
          image={imageUrls[safeActiveImage]}
          title={title}
          active={false}
          onClick={() => undefined}
          className="h-full"
        />

        <div className="grid min-h-0 grid-rows-2 gap-2">
          {imageUrls.slice(1, 3).map((image, index) => {
            const imageIndex = index + 1;

            return (
              <GalleryImage
                key={image}
                image={image}
                title={`${title} image ${imageIndex + 1}`}
                active={safeActiveImage === imageIndex}
                onClick={() => onImageChange(imageIndex)}
                className="h-full"
              />
            );
          })}
        </div>
      </div>

      {/* Mobile gallery */}
      <div className="sm:hidden">
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-brand-tint">
          <img
            src={imageUrls[safeActiveImage]}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {imageUrls.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {imageUrls.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => onImageChange(index)}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border ${
                  safeActiveImage === index ? "border-brand" : "border-line"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryImage({
  image,
  title,
  active,
  onClick,
  className = "",
}: {
  image: string;
  title: string;
  active: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-0 w-full overflow-hidden rounded-md bg-brand-tint ${
        active ? "ring-2 ring-brand ring-offset-2 ring-offset-background" : ""
      } ${className}`}
      aria-label={`View ${title}`}
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </button>
  );
}

function PriceBlock({ listing }: { listing: ListingDetails }) {
  const price =
    listing.pricingType === "FREE"
      ? "Free"
      : listing.rateAmount !== null
        ? `${listing.currencyCode} ${listing.rateAmount.toFixed(2)}`
        : "Contact provider";

  return (
    <div className="shrink-0 sm:text-right">
      <div className="font-serif text-3xl font-medium tracking-tight text-ink">
        {price}
      </div>

      {listing.pricingType === "PAID" && (
        <p className="mt-1 max-w-52 text-xs leading-5 text-muted sm:ml-auto">
          Contact the provider to confirm the final price and booking details.
        </p>
      )}
    </div>
  );
}

function ProviderCard({ listing }: { listing: ListingDetails }) {
  const { lister } = listing;

  return (
    <div className="rounded-md border border-line bg-surface p-6">
      {/* Provider */}
      <div className="flex items-center gap-3.5">
        <ProviderAvatar name={lister.name} />

        <div className="min-w-0">
          <h2 className="font-serif text-lg font-medium text-ink">
            {lister.name}
          </h2>

          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-jade">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-jade-tint">
              <Check className="h-2.5 w-2.5" />
            </span>
            Verified provider
          </div>
        </div>
      </div>

      {/* Vouches */}
      <div className="mt-5 flex items-center gap-2 rounded-md bg-jade-tint px-3 py-2.5">
        <ShieldCheck className="h-4 w-4 shrink-0 text-jade" />

        <span className="text-xs font-semibold text-jade">
          Vouched by {lister.activeVouches}{" "}
          {lister.activeVouches === 1 ? "member" : "members"}
        </span>

        {lister.vouches.length > 0 && (
          <div className="ml-auto flex">
            {lister.vouches.slice(0, 3).map((vouch, index) => (
              <VouchAvatar
                key={vouch.vouchId}
                name={vouch.voucherName}
                className={index > 0 ? "-ml-2" : ""}
              />
            ))}
          </div>
        )}
      </div>

      {/* Provider stats */}
      <div className="my-5 grid grid-cols-3 border-y border-line py-4">
        <ProviderStat
          value={
            listing.averageRatingStar > 0
              ? listing.averageRatingStar.toFixed(1)
              : "—"
          }
          label="Rating"
        />

        <ProviderStat value={String(listing.totalReviewer)} label="Reviews" />

        <ProviderStat
          value={formatDate(listerMemberDate(listing))}
          label="Active"
        />
      </div>

      {/* WhatsApp */}
      {lister.whatsappLink && (
        <a
          href={lister.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
        >
          <MessageCircle className="h-4 w-4" />
          Message on WhatsApp
        </a>
      )}

      {/* Secondary contact */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        {lister.phoneNumber && (
          <a
            href={`tel:${lister.phoneNumber}`}
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        )}

        {lister.emailLink && (
          <a
            href={lister.emailLink}
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        )}
      </div>
    </div>
  );
}

function ProviderAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm font-semibold text-brand ring-2 ring-brand-tint">
      {getInitials(name)}
    </div>
  );
}

function VouchAvatar({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return (
    <div
      title={name}
      className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-jade-tint bg-surface text-[8px] font-bold text-jade ${className}`}
    >
      {getInitials(name)}
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

function ProviderStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-serif text-lg font-medium text-ink">{value}</div>

      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-faint">
        {label}
      </div>
    </div>
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

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 font-serif text-xl font-medium tracking-tight text-ink">
      {children}
    </h2>
  );
}

function formatAvailability(availability: ListingDetails["availability"]) {
  switch (availability) {
    case "BOTH":
      return "Weekdays & weekends";
    case "WEEKDAYS":
      return "Weekdays";
    case "WEEKENDS":
      return "Weekends";
    default:
      return availability;
  }
}

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getReviewKey(review: ListingReview, index: number) {
  return (
    review.id ??
    `${review.reviewerName ?? "review"}-${review.createdAt ?? index}`
  );
}

function listerMemberDate(listing: ListingDetails) {
  /*
   * The current listing API does not provide a memberSince field.
   * Use the listing creation date as a safe fallback until the
   * backend exposes the provider's actual registration date.
   */
  return listing.createdAt;
}
