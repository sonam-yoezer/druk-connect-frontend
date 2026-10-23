import { ListingDetails, ListingReview } from "../../listing/types/listing";

export function getPriceLabel(listing: ListingDetails) {
  if (listing.pricingType === "FREE") return "Free";

  if (listing.rateAmount !== null) {
    return `${listing.currencyCode} ${listing.rateAmount.toFixed(2)}`;
  }

  return "Contact provider";
}

export function formatAvailability(
  availability: ListingDetails["availability"],
) {
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

export function formatDate(value: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function getImageUrl(imageUrl: string) {
  if (imageUrl.startsWith("http")) return imageUrl;

  return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imageUrl}`;
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function getReviewKey(review: ListingReview, index: number) {
  return (
    review.id ??
    `${review.reviewerName ?? "review"}-${review.createdAt ?? index}`
  );
}

export function listerMemberDate(listing: ListingDetails) {
  /*
   * The current listing API does not provide a memberSince field.
   * Use the listing creation date as a safe fallback until the
   * backend exposes the provider's actual registration date.
   */
  return listing.createdAt;
}
