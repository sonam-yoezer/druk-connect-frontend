"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type { Listing } from "@/src/components/listing/types/listing";
import type { UpdateListingData } from "@/src/components/listing/api/updateListing";

type Props = {
  listing: Listing;
  isUpdating: boolean;
  onClose: () => void;
  onSubmit: (data: UpdateListingData) => void;
};

export function EditListingModal({
  listing,
  isUpdating,
  onClose,
  onSubmit,
}: Props) {
  const [pricingType, setPricingType] = useState<"PAID" | "FREE">(
    listing.pricingType,
  );

  const [rateAmount, setRateAmount] = useState(
    listing.rateAmount?.toString() ?? "",
  );

  const [availability, setAvailability] = useState<
    "BOTH" | "WEEKDAYS" | "WEEKENDS"
  >(listing.availability);

  useEffect(() => {
    setPricingType(listing.pricingType);
    setRateAmount(listing.rateAmount?.toString() ?? "");
    setAvailability(listing.availability);
  }, [listing]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit({
      pricingType,
      rateAmount:
        pricingType === "FREE"
          ? 0
          : rateAmount === ""
            ? null
            : Number(rateAmount),
      availability,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isUpdating) {
          onClose();
        }
      }}
    >
      <div
        className="w-full max-w-lg rounded-lg border border-line bg-surface shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-listing-title"
      >
        <div className="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
              Edit listing
            </p>

            <h2
              id="edit-listing-title"
              className="mt-1 font-serif text-xl font-medium tracking-tight text-ink"
            >
              {listing.listingTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6 px-6 py-6">
            <div>
              <label
                htmlFor="pricingType"
                className="text-sm font-medium text-ink"
              >
                Pricing
              </label>

              <select
                id="pricingType"
                value={pricingType}
                onChange={(event) =>
                  setPricingType(event.target.value as "PAID" | "FREE")
                }
                className="mt-2 h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand"
              >
                <option value="PAID">Paid</option>
                <option value="FREE">Free</option>
              </select>
            </div>

            {pricingType === "PAID" && (
              <div>
                <label
                  htmlFor="rateAmount"
                  className="text-sm font-medium text-ink"
                >
                  Rate amount
                </label>

                <div className="mt-2 flex">
                  <span className="flex h-10 items-center rounded-l-md border border-r-0 border-line bg-background px-3 text-sm text-muted">
                    {listing.currencyCode}
                  </span>

                  <input
                    id="rateAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={rateAmount}
                    onChange={(event) => setRateAmount(event.target.value)}
                    placeholder="Enter amount"
                    className="h-10 w-full rounded-r-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="availability"
                className="text-sm font-medium text-ink"
              >
                Availability
              </label>

              <select
                id="availability"
                value={availability}
                onChange={(event) =>
                  setAvailability(
                    event.target.value as "BOTH" | "WEEKDAYS" | "WEEKENDS",
                  )
                }
                className="mt-2 h-10 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-brand"
              >
                <option value="BOTH">Weekdays & weekends</option>
                <option value="WEEKDAYS">Weekdays</option>
                <option value="WEEKENDS">Weekends</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-line px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="h-10 rounded-md border border-line px-4 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="h-10 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
