import Link from "next/link";
import { ArrowUpRight, MapPin, Star } from "lucide-react";

import type { ListingSearchResult } from "../../listing/types/listing";

type ServiceCardProps = {
  listing: ListingSearchResult;
  hrefBase?: string;
};

export function ServiceCard({ listing, hrefBase }: ServiceCardProps) {
  const image = [...(listing.images ?? [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  )[0];

  const imageUrl = image ? getImageUrl(image.imageUrl) : null;

  const price = getPriceLabel(
    listing.pricingType,
    listing.rateAmount,
    listing.currencyCode,
  );

  return (
    <Link
      href={`${hrefBase}/${listing.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-colors duration-200 hover:border-brand-line"
    >
      {/* Image */}
      <div className="relative h-[220px] shrink-0 overflow-hidden bg-brand-tint">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={listing.listingTitle}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No image available
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-md bg-surface/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink shadow-sm">
          {listing.listingCategory}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div>
          <h3 className="font-serif text-xl font-medium leading-tight tracking-tight text-ink">
            {listing.listingTitle}
          </h3>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" />

            <span>{listing.city}</span>
          </div>

          {listing.cuisine && (
            <div className="mt-2 text-xs text-muted">{listing.cuisine}</div>
          )}

          <p className="mt-3 text-xs text-muted">
            By{" "}
            <span className="font-medium text-ink">{listing.listerName}</span>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <div>
            <span className="text-lg font-semibold tracking-tight text-ink">
              {price}
            </span>

            {listing.pricingType === "PAID" && listing.availability && (
              <span className="ml-1 text-xs text-muted">
                · {formatAvailability(listing.availability)}
              </span>
            )}

            {listing.averageRatingStar > 0 && (
              <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                <Star className="h-3 w-3 fill-current" />

                <span>{listing.averageRatingStar.toFixed(1)}</span>

                {listing.totalReviewer > 0 && (
                  <span>({listing.totalReviewer})</span>
                )}
              </div>
            )}
          </div>

          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-strong text-ink transition-colors group-hover:border-brand group-hover:text-brand"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function getImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http")) {
    return imageUrl;
  }

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
}

function getPriceLabel(
  pricingType: string,
  rateAmount: number | null,
  currencyCode: string,
) {
  if (pricingType === "FREE") {
    return "Free";
  }

  if (rateAmount !== null) {
    return `${currencyCode} ${rateAmount.toFixed(2)}`;
  }

  return "Contact provider";
}

function formatAvailability(availability: ListingSearchResult["availability"]) {
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
