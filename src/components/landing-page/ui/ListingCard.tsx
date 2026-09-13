import { ArrowUpRight, MapPin } from "lucide-react";

import { Listing } from "../types/landing";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg">
      {/* Image */}
      <div className="relative h-[190px] shrink-0 overflow-hidden bg-brand-tint">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent"
          aria-hidden="true"
        />

        <span className="absolute left-4 top-4 rounded-full bg-surface/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink shadow-sm">
          {listing.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Title & location */}
        <div>
          <h3 className="font-serif text-xl font-semibold leading-snug text-ink">
            {listing.title}
          </h3>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" />

            <span>
              {listing.location}
              {" · "}
              {listing.postedBy}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6">
          {listing.free ? (
            <span className="inline-flex rounded-full bg-jade-tint px-3 py-1.5 text-xs font-semibold text-jade">
              Free
            </span>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold tracking-tight text-ink">
                {listing.price}
              </span>

              <span className="text-xs text-muted">{listing.priceUnit}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand focus-visible:outline-none"
        >
          Message on WhatsApp
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}
