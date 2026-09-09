import { MapPin } from "lucide-react";
import { Listing } from "../types/landing";

type ListingCardProps = {
  listing: Listing;
};

export function ListingCard({ listing }: ListingCardProps) {
  const accentClasses = {
    maroon: "border-t-maroon",
    pine: "border-t-pine",
    gold: "border-t-marigold",
  };

  return (
    <article className="overflow-hidden rounded border border-line bg-paper-raised">
      <div className="relative h-[170px] overflow-hidden">
        <span className="absolute left-3 top-3 z-10 rounded bg-ink px-2.5 py-1 text-xs font-semibold text-white">
          {listing.category}
        </span>

        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      <div
        className={`border-t-[3px] p-[18px] pb-5 ${accentClasses[listing.accent]}`}
      >
        <h3 className="mb-1.5 font-serif text-lg font-medium leading-[1.15]">
          {listing.title}
        </h3>

        <div className="mb-3 flex items-center gap-1.5 text-[13px] text-slate">
          <MapPin className="h-3.5 w-3.5 shrink-0" />

          <span>
            {listing.location} · Posted by {listing.postedBy}
          </span>
        </div>

        <div className="mb-3.5 text-[15px] font-bold">
          {listing.free ? (
            <span className="inline-block rounded bg-pine px-3 py-1.5 text-[13px] font-bold text-white">
              Free
            </span>
          ) : (
            <>
              {listing.price}

              <span className="text-[13px] font-normal text-slate">
                {" "}
                {listing.priceUnit}
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-[3px] bg-ink px-3 py-[11px] text-sm font-semibold text-white transition-colors hover:bg-maroon"
        >
          Message on WhatsApp
        </button>
      </div>
    </article>
  );
}
