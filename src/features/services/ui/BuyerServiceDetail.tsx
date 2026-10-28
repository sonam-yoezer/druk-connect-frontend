"use client";

import { UserAvatar } from "@/src/shared/ui/UserAvatar";

import { formatAvailabilityDays } from "../../listing/utils/availability";

import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Eye,
  Flag,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReviewEligibility,
  getReviewInvitation,
  recordReviewContact,
} from "../../reviews/api/reviewRequests";
import { useAuthStore } from "../../auth/store/authStore";

import type {
  ListingDetails,
  ListingImage,
  ListingReview,
} from "../../listing/types/listing";
import { ReviewForm } from "../../reviews/ui/ReviewForm";
import { useReportScam } from "../../listing/hooks/useReportScam";
import ReportScamModal from "./ReportScamModal";

type ServiceDetailProps = {
  listing: ListingDetails;
  reviewRequestId?: string;
  autoReview?: boolean;
  contactReturn?: boolean;
};

export function BuyerServiceDetail({
  listing,
  reviewRequestId,
  autoReview = false,
  contactReturn = false,
}: ServiceDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const router = useRouter();
  const client = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);
  const [reviewError, setReviewError] = useState("");
  const [reviewNotice, setReviewNotice] = useState("");
  const [invitationDismissed, setInvitationDismissed] = useState(false);
  const waitingForReturn = useRef(false);
  const contactRecorded = useRef<ReturnType<typeof recordReviewContact> | null>(
    null,
  );
  const reportScamMutation = useReportScam();

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reportError, setReportError] = useState("");
  const [reportNotice, setReportNotice] = useState("");
  const eligibility = useQuery({
    queryKey: ["review-eligibility", listing.id, userId],
    queryFn: () => getReviewEligibility(listing.id),
    enabled: Boolean(userId),
    retry: false,
  });
  const invitation = useQuery({
    queryKey: ["review-invitation", reviewRequestId, userId],
    queryFn: () => getReviewInvitation(reviewRequestId!),
    enabled: Boolean(reviewRequestId && userId),
    retry: false,
  });
  const validInvitation =
    invitation.data?.listingId === listing.id &&
    invitation.data?.buyerUserId === userId;
  const invitationReview =
    autoReview && (!reviewRequestId || validInvitation) && !invitationDismissed;
  useEffect(() => {
    const onReturn = () => {
      if (document.visibilityState !== "visible" || !waitingForReturn.current)
        return;
      waitingForReturn.current = false;
      void (contactRecorded.current || Promise.resolve(null))
        .then(() => getReviewEligibility(listing.id))
        .then((result) => {
          void client.invalidateQueries({
            queryKey: ["review-eligibility", listing.id, userId],
          });
          if (result.canReview) setShowReviewPrompt(true);
          else setReviewNotice(result.message);
        })
        .catch((error) => setReviewError(error.message));
    };
    window.addEventListener("focus", onReturn);
    document.addEventListener("visibilitychange", onReturn);
    return () => {
      window.removeEventListener("focus", onReturn);
      document.removeEventListener("visibilitychange", onReturn);
    };
  }, [listing.id, userId, client]);

  const images = listing.images
    .slice()
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const handleWhatsAppContacted = () => {
    setReviewError("");
    waitingForReturn.current = true;
    contactRecorded.current = recordReviewContact(listing.id);
    void contactRecorded.current
      .then(() =>
        client.invalidateQueries({
          queryKey: ["review-eligibility", listing.id, userId],
        }),
      )
      .catch((error) => {
        waitingForReturn.current = false;
        setReviewError(error.message);
      });
  };

  const handleReviewPromptYes = () => {
    setShowReviewPrompt(false);
    setShowReviewModal(true);
    setInvitationDismissed(true);
  };

  const handleReviewPromptClose = () => {
    setShowReviewPrompt(false);
    setInvitationDismissed(true);
  };

  const handleReviewModalClose = () => {
    setShowReviewModal(false);
    setInvitationDismissed(true);
    if (reviewRequestId || contactReturn)
      router.replace(`/buyer-dashboard/services/${listing.id}`, {
        scroll: false,
      });
  };

  const handleReportClick = () => {
    setReportError("");
    setReportNotice("");
    setReportReason("");
    setReportDetails("");
    setShowReportModal(true);
  };

  const handleReportSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setReportError("");
    setReportNotice("");

    try {
      await reportScamMutation.mutateAsync({
        listingId: listing.id,
        reason: reportReason,
        details: reportDetails.trim(),
      });

      setShowReportModal(false);
      setReportNotice(
        "Your report has been submitted successfully. Thank you for helping keep the community safe.",
      );
    } catch (error) {
      setReportError(
        error instanceof Error
          ? error.message
          : "Failed to submit your report. Please try again.",
      );
    }
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pb-24">
          <ServiceBreadcrumb listing={listing} />
          {reviewError && (
            <p
              role="alert"
              className="mt-4 rounded-md bg-danger-tint p-4 text-danger"
            >
              {reviewError}
            </p>
          )}
          {reviewNotice && (
            <p role="status" className="mt-4 rounded-md bg-brand-tint p-4">
              {reviewNotice}
            </p>
          )}
          {invitation.error && (
            <p
              role="alert"
              className="mt-4 rounded-md bg-danger-tint p-4 text-danger"
            >
              {invitation.error.message} Sign in with the invited Buyer account.
            </p>
          )}
          {reviewRequestId && invitation.isPending && (
            <p role="status" className="mt-4">
              Checking your review invitation…
            </p>
          )}
          {invitation.data && !validInvitation && (
            <p role="alert" className="mt-4 text-danger">
              This invitation is for a different service or account.
            </p>
          )}
          {eligibility.error && (
            <p role="alert" className="mt-4 text-danger">
              {eligibility.error.message}
            </p>
          )}
          {eligibility.data?.canReview && (
            <button
              className="mt-4 rounded-md bg-brand px-4 py-2 text-white"
              onClick={() => setShowReviewModal(true)}
            >
              Leave a review
            </button>
          )}
          {reviewRequestId &&
            validInvitation &&
            eligibility.data &&
            !eligibility.data.canReview && (
              <p role="status" className="mt-4">
                {eligibility.data.message}
              </p>
            )}

          {reportError && (
            <p
              role="alert"
              className="mt-4 rounded-md bg-danger-tint p-4 text-danger"
            >
              {reportError}
            </p>
          )}

          {reportNotice && (
            <p role="status" className="mt-4 rounded-md bg-brand-tint p-4">
              {reportNotice}
            </p>
          )}

          <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:gap-12">
            <div className="min-w-0">
              <ServiceGallery
                images={images}
                title={listing.listingTitle}
                activeImage={activeImage}
                onImageChange={setActiveImage}
              />

              <ServiceHeader listing={listing} />

              <AboutSection description={listing.description} />

              <ServiceDetailsSection listing={listing} />

              <AvailabilitySection listing={listing} />

              <ReviewsSection listing={listing} />
            </div>

            <aside className="lg:sticky lg:top-24">
              <ProviderCard
                listing={listing}
                onContact={handleWhatsAppContacted}
                onReport={handleReportClick}
              />

              <BookingNotice />
            </aside>
          </div>
        </div>
      </main>

      {(showReviewPrompt || (contactReturn && !invitationDismissed)) &&
        eligibility.data?.canReview &&
        !showReviewModal && (
          <ReviewPrompt
            listingTitle={listing.listingTitle}
            onYes={handleReviewPromptYes}
            onClose={handleReviewPromptClose}
          />
        )}

      {(showReviewModal || invitationReview) && eligibility.data?.canReview && (
        <ReviewModal
          listing={listing}
          onClose={handleReviewModalClose}
          onSubmitted={() => {
            handleReviewModalClose();
            setReviewNotice(
              "Review submitted successfully and is awaiting admin approval.",
            );
            void client.invalidateQueries({
              queryKey: ["review-eligibility", listing.id, userId],
            });
            router.refresh();
          }}
        />
      )}

      {showReportModal && (
        <ReportScamModal
          reason={reportReason}
          details={reportDetails}
          error={reportError}
          isSubmitting={reportScamMutation.isPending}
          onReasonChange={setReportReason}
          onDetailsChange={setReportDetails}
          onSubmit={handleReportSubmit}
          onClose={() => {
            if (reportScamMutation.isPending) return;

            setShowReportModal(false);
            setReportError("");
          }}
        />
      )}
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Breadcrumb                                                                  */
/* -------------------------------------------------------------------------- */

function ServiceBreadcrumb({ listing }: { listing: ListingDetails }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs text-muted"
    >
      <Link
        href="/buyer-dashboard/services"
        className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Browse services
      </Link>

      <span aria-hidden="true">/</span>

      <span>{listing.serviceType}</span>

      <span aria-hidden="true">/</span>

      <span className="max-w-[240px] truncate font-medium text-ink">
        {listing.listingTitle}
      </span>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Service header                                                              */
/* -------------------------------------------------------------------------- */

function ServiceHeader({ listing }: { listing: ListingDetails }) {
  return (
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
  );
}

/* -------------------------------------------------------------------------- */
/* About                                                                      */
/* -------------------------------------------------------------------------- */

function AboutSection({ description }: { description: string }) {
  return (
    <section className="mt-9 border-t border-line py-7">
      <SectionHeading>About this service</SectionHeading>

      <p className="max-w-2xl text-sm leading-7 text-muted">{description}</p>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Service details                                                             */
/* -------------------------------------------------------------------------- */

function ServiceDetailsSection({ listing }: { listing: ListingDetails }) {
  return (
    <section className="border-t border-line py-7">
      <SectionHeading>Service details</SectionHeading>

      <div className="grid sm:grid-cols-2 sm:gap-x-10">
        <DetailRow label="Cuisine" value={listing.cuisine || "—"} />

        <DetailRow
          label="Minimum order"
          value={String(listing.minimumOrder ?? "—")}
        />

        <DetailRow label="Serves" value={String(listing.serves ?? "—")} />

        <DetailRow
          label="Availability"
          value={formatAvailability(listing.availability)}
        />

        <DetailRow label="Pricing" value={getPriceLabel(listing)} />
      </div>

      {listing.dietaryOptions?.length > 0 && (
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
  );
}

/* -------------------------------------------------------------------------- */
/* Availability                                                                */
/* -------------------------------------------------------------------------- */

function AvailabilitySection({ listing }: { listing: ListingDetails }) {
  return (
    <section className="border-t border-line py-7">
      <SectionHeading>Availability</SectionHeading>

      <p className="mb-4 max-w-xl text-sm leading-6 text-muted">
        Availability can vary depending on the size of your order and your
        requirements. Contact the provider to confirm the details before
        booking.
      </p>

      <div className="inline-flex items-center gap-2 rounded-md bg-jade-tint px-3.5 py-2 text-xs font-semibold text-jade">
        <CalendarDays className="h-4 w-4" />
        {formatAvailability(listing.availability)}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Reviews                                                                     */
/* -------------------------------------------------------------------------- */

function ReviewsSection({ listing }: { listing: ListingDetails }) {
  return (
    <section className="border-t border-line py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading>Reviews</SectionHeading>

        <RatingSummary
          rating={listing.averageRatingStar}
          reviews={listing.totalReviewer}
        />
      </div>

      {listing.reviews?.length > 0 ? (
        <div className="mt-1 border-t border-line">
          {listing.reviews.map((review, index) => (
            <ReviewCard key={getReviewKey(review, index)} review={review} />
          ))}
        </div>
      ) : (
        <div className="mt-1 border-t border-line py-8">
          <p className="text-sm text-muted">No reviews yet.</p>
        </div>
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

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
      <div className="hidden aspect-[16/8.5] gap-2 sm:grid sm:grid-cols-[2fr_1fr]">
        <GalleryImage
          image={imageUrls[safeActiveImage]}
          title={title}
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
  active = false,
  onClick,
  className = "",
}: {
  image: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const content = (
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  );

  if (!onClick) {
    return (
      <div
        className={`group relative min-h-0 w-full overflow-hidden rounded-md bg-brand-tint ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-0 w-full overflow-hidden rounded-md bg-brand-tint ${
        active ? "ring-2 ring-brand ring-offset-2 ring-offset-background" : ""
      } ${className}`}
      aria-label={`View ${title}`}
    >
      {content}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                    */
/* -------------------------------------------------------------------------- */

function ProviderCard({
  listing,
  onContact,
  onReport,
}: {
  listing: ListingDetails;
  onContact: () => void;
  onReport: () => void;
}) {
  const { lister } = listing;

  const handleWhatsAppClick = () => {
    if (!lister.whatsappLink) return;

    window.open(lister.whatsappLink, "_blank", "noopener,noreferrer");
    onContact();
  };

  return (
    <div className="rounded-md border border-line bg-surface p-6">
      <div className="flex items-center gap-3.5">
        <ProviderAvatar name={lister.name} imageUrl={lister.profileImageUrl} />

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

      <VouchSummary
        activeVouches={lister.activeVouches}
        vouches={lister.vouches ?? []}
      />

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

      <button
        type="button"
        onClick={onReport}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-danger transition-colors hover:bg-danger-tint"
      >
        <Flag className="h-4 w-4" />
        Report scam or suspicious activity
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Vouch summary                                                               */
/* -------------------------------------------------------------------------- */

type Vouch = ListingDetails["lister"]["vouches"][number];

function VouchSummary({
  activeVouches,
  vouches,
}: {
  activeVouches: number;
  vouches: Vouch[];
}) {
  const [open, setOpen] = useState(false);
  const hasVouches = vouches.length > 0;
  const hiddenCount = Math.max(activeVouches - vouches.length, 0);

  return (
    <div className="mt-5 overflow-hidden rounded-md bg-jade-tint">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        disabled={!hasVouches}
        aria-expanded={open}
        aria-controls="voucher-list"
        className="flex w-full items-center gap-2 px-3 py-2.5 text-left disabled:cursor-default"
      >
        <ShieldCheck className="h-4 w-4 shrink-0 text-jade" />

        <span className="text-xs font-semibold text-jade">
          Vouched by {activeVouches}{" "}
          {activeVouches === 1 ? "member" : "members"}
        </span>

        {hasVouches && (
          <div className="ml-auto flex items-center gap-2">
            <div className="flex">
              {vouches.slice(0, 3).map((vouch, index) => (
                <VouchAvatar
                  key={vouch.vouchId}
                  name={vouch.voucherName} imageUrl={vouch.profileImageUrl}
                  className={index > 0 ? "-ml-2" : ""}
                />
              ))}
            </div>

            <ChevronDown
              className={`h-4 w-4 text-jade transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
      </button>

      {open && hasVouches && (
        <ul
          id="voucher-list"
          className="max-h-48 space-y-2 overflow-y-auto border-t border-jade/15 px-3 py-3"
        >
          {vouches.map((vouch) => (
            <li key={vouch.vouchId} className="flex items-center gap-2.5">
              <VouchAvatar name={vouch.voucherName} imageUrl={vouch.profileImageUrl} />
              <span className="text-xs font-medium text-ink">
                {vouch.voucherName}
              </span>
            </li>
          ))}

          {hiddenCount > 0 && (
            <li className="pl-8 text-xs text-muted">+{hiddenCount} more</li>
          )}
        </ul>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Review prompt                                                               */
/* -------------------------------------------------------------------------- */

function ReviewPrompt({
  listingTitle,
  onYes,
  onClose,
}: {
  listingTitle: string;
  onYes: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-prompt-title"
    >
      <div className="relative w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-ink"
          aria-label="Close review prompt"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-tint text-brand">
          <Star className="h-5 w-5" />
        </div>

        <h2
          id="review-prompt-title"
          className="mt-5 font-serif text-2xl font-medium text-ink"
        >
          Did you use this service?
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted">
          You just contacted{" "}
          <span className="font-semibold text-ink">{listingTitle}</span>. If
          you&apos;ve already used the service, you can share your experience
          with the community.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onYes}
            className="flex h-11 flex-1 items-center justify-center rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            Yes, leave a review
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex h-11 flex-1 items-center justify-center rounded-md border border-line-strong px-4 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
          >
            Not yet
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Review modal                                                                */
/* -------------------------------------------------------------------------- */

function ReviewModal({
  listing,
  onClose,
  onSubmitted,
}: {
  listing: ListingDetails;
  onClose: () => void;
  onSubmitted: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-ink/40 px-5 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-lg border border-line bg-surface p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-ink"
          aria-label="Close review modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="pr-8">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Share your experience
          </p>

          <h2
            id="review-modal-title"
            className="mt-2 font-serif text-2xl font-medium text-ink"
          >
            Review {listing.listingTitle}
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Your experience can help other members of the Bhutanese community
            make a confident decision.
          </p>
        </div>

        <div className="mt-6">
          <ReviewForm listingId={listing.id} onSuccess={onSubmitted} />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Booking notice                                                              */
/* -------------------------------------------------------------------------- */

function BookingNotice() {
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
/* Small UI components                                                         */
/* -------------------------------------------------------------------------- */

function ProviderAvatar({ name, imageUrl }: { name: string; imageUrl?: string | null }) {
  return <UserAvatar name={name} imageUrl={imageUrl} size={56} className="ring-2 ring-brand-tint" />;
}

function VouchAvatar({ name, imageUrl, className = "" }: { name: string; imageUrl?: string | null; className?: string }) {
  return <UserAvatar name={name} imageUrl={imageUrl} size={24} className={`border-2 border-jade-tint ${className}`} />;
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
          <UserAvatar name={review.reviewerName ?? review.reviewer ?? "Reviewer"} imageUrl={review.profileImageUrl} size={36} />
          <span className="text-sm font-semibold text-ink">
            {review.reviewerName ?? review.reviewer ?? "Anonymous"}
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

function PriceBlock({ listing }: { listing: ListingDetails }) {
  return (
    <div className="shrink-0 sm:text-right">
      <div className="font-serif text-3xl font-medium tracking-tight text-ink">
        {getPriceLabel(listing)}
      </div>

      {listing.pricingType === "PAID" && (
        <p className="mt-1 max-w-52 text-xs leading-5 text-muted sm:ml-auto">
          Contact the provider to confirm the final price and booking details.
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function getPriceLabel(listing: ListingDetails) {
  if (listing.pricingType === "FREE") {
    return "Free";
  }

  if (listing.rateAmount !== null) {
    return `${listing.currencyCode} ${listing.rateAmount.toFixed(2)}`;
  }

  return "Contact provider";
}

function formatAvailability(availability: ListingDetails["availability"]) {
  return formatAvailabilityDays(availability);
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
