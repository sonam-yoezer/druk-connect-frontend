import { ArrowUpRight, MapPin } from "lucide-react";
import { Listing } from "../types/landing";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface">
      {/* Image */}
      <div className="relative h-[190px] shrink-0 overflow-hidden bg-brand-tint">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover"
        />

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
          aria-hidden="true"
        />

        <span className="absolute left-4 top-4 rounded-md bg-surface/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink">
          {listing.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div>
          <h3 className="font-serif text-xl font-semibold leading-snug text-ink">
            {listing.title}
          </h3>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" />

            <span>
              {listing.location}
              {" · "}
              {listing.postedBy}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-5">
          {listing.free ? (
            <span className="inline-flex rounded-md bg-jade-tint px-3 py-1.5 text-xs font-semibold text-jade">
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
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand focus-visible:outline-none"
        >
          Message on WhatsApp
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
