import { Star, X } from "lucide-react";

import { ListingDetails } from "../../listing/types/listing";
import { ReviewForm } from "../../reviews/ui/ReviewForm";
import { ReviewFlow } from "../hooks/useServiceDetailFlows";

export function ReviewStatusMessages({
  review,
  reviewRequestId,
}: {
  review: ReviewFlow;
  reviewRequestId?: string;
}) {
  const {
    reviewError,
    reviewNotice,
    invitation,
    validInvitation,
    eligibility,
    canReview,
    openReviewModal,
  } = review;

  return (
    <>
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

      {canReview && (
        <button
          type="button"
          className="mt-4 rounded-md bg-brand px-4 py-2 text-white"
          onClick={openReviewModal}
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
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* "Did you use this service?" prompt                                          */
/* -------------------------------------------------------------------------- */

export function ReviewPrompt({
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
        <CloseButton onClick={onClose} label="Close review prompt" />

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

export function ReviewModal({
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
        <CloseButton onClick={onClose} label="Close review modal" />

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

function CloseButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-4 top-4 rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-ink"
      aria-label={label}
    >
      <X className="h-4 w-4" />
    </button>
  );
}
