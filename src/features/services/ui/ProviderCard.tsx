"use client";

import { useEffect, useState } from "react";
import { Check, Flag, MessageCircle, ShieldCheck, X } from "lucide-react";

import type { ListingDetails } from "../../listing/types/listing";
import {
  formatDate,
  getInitials,
  listerMemberDate,
} from "../utils/serviceDetail.utils";

type ProviderCardProps = {
  listing: ListingDetails;
  onContact: () => void;
  onReport: () => void;
};

export function ProviderCard({
  listing,
  onContact,
  onReport,
}: ProviderCardProps) {
  const { lister } = listing;
  const [showVouchers, setShowVouchers] = useState(false);

  useEffect(() => {
    if (!showVouchers) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowVouchers(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showVouchers]);

  const handleWhatsAppClick = () => {
    if (!lister.whatsappLink) return;

    window.open(lister.whatsappLink, "_blank", "noopener,noreferrer");

    onContact();
  };

  return (
    <>
      <div className="rounded-md border border-line bg-surface p-6">
        {/* Provider information */}
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

        {/* Vouchers */}
        <button
          type="button"
          onClick={() => setShowVouchers(true)}
          aria-label={`View ${lister.activeVouches} members who vouched`}
          className="mt-5 flex w-full items-center gap-2 rounded-md bg-jade-tint px-3 py-2.5 text-left transition-colors hover:bg-jade-tint/80"
        >
          <ShieldCheck className="h-4 w-4 shrink-0 text-jade" />

          <span className="text-xs font-semibold text-jade">
            Vouched by {lister.activeVouches}{" "}
            {lister.activeVouches === 1 ? "member" : "members"}
          </span>

          {lister.vouches?.length > 0 && (
            <div className="ml-auto flex shrink-0">
              {lister.vouches.slice(0, 3).map((vouch, index) => (
                <VouchAvatar
                  key={vouch.vouchId}
                  name={vouch.voucherName}
                  className={index > 0 ? "-ml-2" : ""}
                />
              ))}
            </div>
          )}
        </button>

        {/* Provider statistics */}
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

        {/* Contact provider */}
        {lister.whatsappLink && (
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand"
          >
            <MessageCircle className="h-4 w-4" />
            Message on WhatsApp
          </button>
        )}

        {/* Report provider */}
        <button
          type="button"
          onClick={onReport}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger-tint"
        >
          <Flag className="h-4 w-4" />
          Report scam or suspicious activity
        </button>
      </div>

      {/* Voucher modal */}
      {showVouchers && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowVouchers(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vouchers-title"
            className="w-full max-w-md rounded-xl border border-line bg-surface p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="vouchers-title"
                  className="text-lg font-semibold text-ink"
                >
                  Members who vouched
                </h2>

                <p className="mt-1 text-sm text-muted">
                  {lister.activeVouches}{" "}
                  {lister.activeVouches === 1 ? "member has" : "members have"}{" "}
                  vouched for this provider.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowVouchers(false)}
                aria-label="Close vouchers dialog"
                className="shrink-0 rounded-md p-2 text-muted transition-colors hover:bg-background hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 max-h-80 space-y-3 overflow-y-auto">
              {lister.vouches?.length ? (
                lister.vouches.map((vouch) => (
                  <div
                    key={vouch.vouchId}
                    className="flex items-center gap-3 rounded-lg bg-background p-3"
                  >
                    <VouchAvatar name={vouch.voucherName} size="large" />

                    <span className="text-sm font-medium text-ink">
                      {vouch.voucherName}
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-4 text-sm text-muted">
                  No voucher details are available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking notice                                                              */
/* -------------------------------------------------------------------------- */

export function BookingNotice() {
  return (
    <div className="mt-4 rounded-md border border-line bg-brand-tint/50 p-5">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />

        <div>
          <h3 className="text-sm font-semibold text-ink">Before you book</h3>

          <p className="mt-2 text-xs leading-5 text-muted">
            Confirm the service details, price, dietary requirements,
            availability, and booking details directly with the provider before
            making payment.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Provider avatar                                                             */
/* -------------------------------------------------------------------------- */

function ProviderAvatar({ name }: { name: string }) {
  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-tint text-sm font-semibold text-brand ring-2 ring-brand-tint">
      {getInitials(name)}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Voucher avatar                                                              */
/* -------------------------------------------------------------------------- */

function VouchAvatar({
  name,
  className = "",
  size = "small",
}: {
  name: string;
  className?: string;
  size?: "small" | "large";
}) {
  const sizeClasses =
    size === "large"
      ? "h-10 w-10 text-xs"
      : "h-6 w-6 border-2 border-jade-tint text-[8px]";

  return (
    <div
      title={name}
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full bg-surface font-bold text-jade ${sizeClasses} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Provider statistic                                                          */
/* -------------------------------------------------------------------------- */

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
