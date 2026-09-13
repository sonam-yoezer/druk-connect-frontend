import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

type ListingStatus = "ACTIVE" | "DRAFT" | "PAUSED";

type ListingCardProps = {
  id: number;
  title: string;
  category: string;
  location: string;
  price: string;
  priceUnit: string;
  image: string;
  views: number;
  status: ListingStatus;
};

export function ListingCard({
  id,
  title,
  category,
  location,
  price,
  priceUnit,
  image,
  views,
  status,
}: ListingCardProps) {
  return (
    <Link
      href={`/services/${id}`}
      className="group block overflow-hidden rounded-md border border-line bg-surface transition-colors hover:border-brand-line"
    >
      <div className="relative h-44 overflow-hidden bg-brand-tint">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <span
          className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${
            status === "ACTIVE"
              ? "bg-jade-tint text-jade"
              : status === "DRAFT"
                ? "bg-surface/95 text-muted"
                : "bg-surface/95 text-faint"
          }`}
        >
          {status.toLowerCase()}
        </span>
      </div>

      <div className="p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-faint">
          {category}
        </p>

        <h3 className="mt-2 font-serif text-lg font-medium tracking-tight text-ink">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5 text-faint" />
          {location}
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-4">
          <div>
            <span className="text-base font-semibold text-ink">{price}</span>

            <span className="ml-1 text-xs text-muted">{priceUnit}</span>
          </div>

          <span className="flex items-center gap-1 text-xs font-medium text-muted">
            {views} views
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
