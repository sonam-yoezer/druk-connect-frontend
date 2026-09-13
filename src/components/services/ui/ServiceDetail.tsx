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

type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
  tags: string[];
};

type Service = {
  id: number;
  title: string;
  category: string;
  location: string;
  posted: string;
  views: number;
  price: string;
  priceUnit: string;
  priceNote: string;
  images: string[];
  description: string;
  details: [string, string][];
  availability: string;
  provider: {
    name: string;
    image: string;
    rating: string;
    reviews: number;
    memberSince: string;
    vouches: number;
    vouchImages: string[];
  };
  reviews: Review[];
};

type ServiceDetailProps = {
  service: Service;
};

export function ServiceDetail({ service }: ServiceDetailProps) {
  const [activeImage, setActiveImage] = useState(0);

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

          <span>{service.category}</span>

          <span aria-hidden="true">/</span>

          <span className="max-w-[240px] truncate font-medium text-ink">
            {service.title}
          </span>
        </nav>

        <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:gap-12">
          {/* Main */}
          <div className="min-w-0">
            <ServiceGallery
              images={service.images}
              title={service.title}
              activeImage={activeImage}
              onImageChange={setActiveImage}
            />

            {/* Listing header */}
            <section className="mt-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <span className="inline-flex rounded-md bg-brand-tint px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand">
                    {service.category}
                  </span>

                  <h1 className="mt-4 max-w-2xl font-serif text-3xl font-medium leading-[1.08] tracking-[-0.025em] text-ink sm:text-4xl">
                    {service.title}
                  </h1>
                </div>

                <div className="shrink-0 sm:text-right">
                  <div className="font-serif text-3xl font-medium tracking-tight text-ink">
                    {service.price}
                    <span className="ml-1 text-base font-sans font-medium text-muted">
                      {service.priceUnit}
                    </span>
                  </div>

                  <p className="mt-1 max-w-52 text-xs leading-5 text-muted sm:ml-auto">
                    {service.priceNote}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-faint" />
                  {service.location}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-faint" />
                  Posted {service.posted}
                </span>

                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5 text-faint" />
                  {service.views} views
                </span>
              </div>
            </section>

            {/* About */}
            <section className="mt-9 border-t border-line py-7">
              <SectionHeading>About this service</SectionHeading>

              <p className="max-w-2xl text-sm leading-7 text-muted">
                {service.description}
              </p>
            </section>

            {/* Details */}
            <section className="border-t border-line py-7">
              <SectionHeading>Service details</SectionHeading>

              <div className="grid sm:grid-cols-2 sm:gap-x-10">
                {service.details.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-6 border-b border-line py-3.5"
                  >
                    <span className="text-sm text-muted">{label}</span>

                    <span className="text-right text-sm font-semibold text-ink">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Availability */}
            <section className="border-t border-line py-7">
              <SectionHeading>Availability</SectionHeading>

              <p className="mb-4 max-w-xl text-sm leading-6 text-muted">
                Availability can vary depending on the size of your order and
                the event date. Contact the provider to confirm your booking.
              </p>

              <div className="inline-flex items-center gap-2 rounded-md bg-jade-tint px-3.5 py-2 text-xs font-semibold text-jade">
                <CalendarDays className="h-4 w-4" />
                {service.availability}
              </div>
            </section>

            {/* Reviews */}
            <section className="border-t border-line py-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading>Reviews</SectionHeading>

                <RatingSummary
                  rating={service.provider.rating}
                  reviews={service.provider.reviews}
                />
              </div>

              <div className="mt-1 border-t border-line">
                {service.reviews.map((review) => (
                  <ReviewCard
                    key={`${review.name}-${review.date}`}
                    review={review}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24">
            <ProviderCard service={service} />

            <div className="mt-4 rounded-md border border-line bg-brand-tint/50 p-5">
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />

                <div>
                  <h3 className="text-sm font-semibold text-ink">
                    Before you book
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-muted">
                    Confirm the menu, number of guests, price, dietary
                    requirements, and booking details directly with the provider
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
  images: string[];
  title: string;
  activeImage: number;
  onImageChange: (index: number) => void;
}) {
  const visibleImages = images.slice(0, 3);

  if (!visibleImages.length) {
    return <div className="aspect-[16/9] rounded-md bg-brand-tint" />;
  }

  return (
    <div>
      {/* Desktop gallery */}
      <div className="hidden aspect-[16/8.5] gap-2 sm:grid sm:grid-cols-[2fr_1fr]">
        {/* Main image */}
        <GalleryImage
          image={visibleImages[activeImage] ?? visibleImages[0]}
          title={title}
          active={false}
          onClick={() => undefined}
          className="h-full"
        />

        {/* Secondary images */}
        <div className="grid min-h-0 grid-rows-2 gap-2">
          {visibleImages.slice(1, 3).map((image, index) => {
            const imageIndex = index + 1;

            return (
              <GalleryImage
                key={image}
                image={image}
                title={`${title} image ${imageIndex + 1}`}
                active={activeImage === imageIndex}
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
            src={visibleImages[activeImage] ?? visibleImages[0]}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-2 flex gap-2 overflow-x-auto">
          {visibleImages.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => onImageChange(index)}
              className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border ${
                activeImage === index ? "border-brand" : "border-line"
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

function ProviderCard({ service }: { service: Service }) {
  const { provider } = service;

  return (
    <div className="rounded-md border border-line bg-surface p-6">
      {/* Provider */}
      <div className="flex items-center gap-3.5">
        <img
          src={provider.image}
          alt={provider.name}
          className="h-14 w-14 rounded-full object-cover ring-2 ring-brand-tint"
        />

        <div className="min-w-0">
          <h2 className="font-serif text-lg font-medium text-ink">
            {provider.name}
          </h2>

          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-jade">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-jade-tint">
              <Check className="h-2.5 w-2.5" />
            </span>
            Phone verified
          </div>
        </div>
      </div>

      {/* Vouches */}
      <div className="mt-5 flex items-center gap-2 rounded-md bg-jade-tint px-3 py-2.5">
        <ShieldCheck className="h-4 w-4 shrink-0 text-jade" />

        <span className="text-xs font-semibold text-jade">
          Vouched by {provider.vouches} members
        </span>

        <div className="ml-auto flex">
          {provider.vouchImages.map((image, index) => (
            <img
              key={image}
              src={image}
              alt=""
              className={`h-6 w-6 rounded-full border-2 border-jade-tint object-cover ${
                index > 0 ? "-ml-2" : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Provider stats */}
      <div className="my-5 grid grid-cols-3 border-y border-line py-4">
        <ProviderStat value={provider.rating} label="Rating" />

        <ProviderStat value={String(provider.reviews)} label="Reviews" />

        <ProviderStat value={provider.memberSince} label="Member" />
      </div>

      {/* Primary contact */}
      <a
        href="#"
        className="flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
      >
        <MessageCircle className="h-4 w-4" />
        Message on WhatsApp
      </a>

      {/* Secondary contact */}
      <div className="mt-2 grid grid-cols-2 gap-2">
        <a
          href="#"
          className="flex h-11 items-center justify-center gap-2 rounded-md border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>

        <a
          href="#"
          className="flex h-11 items-center justify-center gap-2 rounded-md border border-line-strong text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      </div>
    </div>
  );
}

function RatingSummary({
  rating,
  reviews,
}: {
  rating: string;
  reviews: number;
}) {
  return (
    <div className="flex items-center gap-3 pb-4 sm:pb-0">
      <span className="font-serif text-3xl font-medium text-ink">{rating}</span>

      <div>
        <div className="flex items-center gap-0.5 text-brand">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className="h-3.5 w-3.5 fill-current" />
          ))}
        </div>

        <p className="mt-1 text-xs text-muted">{reviews} reviews</p>
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

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="border-b border-line py-5 last:border-b-0">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-ink">{review.name}</span>

          <span className="flex items-center gap-0.5 text-brand">
            {Array.from({ length: review.rating }).map((_, index) => (
              <Star key={index} className="h-3 w-3 fill-current" />
            ))}
          </span>
        </div>

        <span className="text-xs text-faint">{review.date}</span>
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">{review.text}</p>

      {review.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {review.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-line bg-background px-2.5 py-1 text-[11px] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
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
