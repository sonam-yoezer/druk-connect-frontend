"use client";

import { useState } from "react";
import { Check, Clock3, MessageSquare, Star, UserRound, X } from "lucide-react";
import { AdminReview } from "../../reviews/types/reviews";
import { useAdminReviews } from "../hooks/useAdminReviews";
import { useModerateReview } from "../hooks/useModerateReview";

export default function AdminReviewsPage() {
  const [page, setPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(
    null,
  );

  const { data, isLoading, isError, error } = useAdminReviews({
    page,
    size: 10,
  });

  const moderateReviewMutation = useModerateReview();

  const reviews = data?.reviews ?? [];

  const handleApprove = (review: AdminReview) => {
    moderateReviewMutation.mutate({
      reviewId: review.reviewId,
      data: {
        action: "APPROVE",
        reason: "Your review is approved",
      },
    });
  };

  const handleReject = (review: AdminReview) => {
    setSelectedReview(review);
  };

  const handleConfirmReject = (reason: string) => {
    if (!selectedReview) {
      return;
    }

    moderateReviewMutation.mutate(
      {
        reviewId: selectedReview.reviewId,
        data: {
          action: "REJECT",
          reason,
        },
      },
      {
        onSuccess: () => {
          setSelectedReview(null);
        },
      },
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-brand">Moderation</p>

        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-ink">
          Reviews
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Review and moderate feedback submitted by users before it appears
          publicly on listings.
        </p>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Pending reviews"
          value={data?.totalElements ?? 0}
          icon={Clock3}
        />

        <SummaryCard
          label="Current page"
          value={data?.currentPage ?? 0}
          icon={MessageSquare}
        />

        <SummaryCard
          label="Total pages"
          value={data?.totalPages ?? 0}
          icon={Star}
        />
      </div>

      {/* Reviews */}
      <section className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="border-b border-line px-6 py-5">
          <h2 className="font-serif text-xl font-medium text-ink">
            Pending reviews
          </h2>

          <p className="mt-1 text-sm text-muted">
            Review submitted feedback before approving or rejecting it.
          </p>
        </div>

        {isLoading && <ReviewsLoading />}

        {isError && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm font-medium text-ink">
              Unable to load reviews
            </p>

            <p className="mt-1 text-sm text-muted">
              {error instanceof Error
                ? error.message
                : "Something went wrong while loading reviews."}
            </p>
          </div>
        )}

        {!isLoading && !isError && reviews.length === 0 && <EmptyReviews />}

        {!isLoading && !isError && reviews.length > 0 && (
          <div className="divide-y divide-line">
            {reviews.map((review) => {
              const isModerating =
                moderateReviewMutation.isPending &&
                moderateReviewMutation.variables?.reviewId === review.reviewId;

              return (
                <ReviewCard
                  key={review.reviewId}
                  review={review}
                  isModerating={isModerating}
                  onApprove={() => handleApprove(review)}
                  onReject={() => handleReject(review)}
                />
              );
            })}
          </div>
        )}
      </section>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Reject Modal */}
      {selectedReview && (
        <RejectReviewModal
          review={selectedReview}
          isSubmitting={moderateReviewMutation.isPending}
          onClose={() => {
            if (!moderateReviewMutation.isPending) {
              setSelectedReview(null);
            }
          }}
          onConfirm={handleConfirmReject}
        />
      )}
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Clock3;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">{label}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-tint text-brand">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-4 font-serif text-2xl font-medium text-ink">{value}</p>
    </div>
  );
}

function ReviewCard({
  review,
  isModerating,
  onApprove,
  onReject,
}: {
  review: AdminReview;
  isModerating: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <article className="p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Review content */}
        <div className="min-w-0 flex-1">
          {/* Listing */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                Listing
              </p>

              <h3 className="mt-1 font-serif text-lg font-medium text-ink">
                {review.listingTitle}
              </h3>
            </div>

            <StatusBadge status={review.status} />
          </div>

          {/* Reviewer */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
              <UserRound className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {review.reviewerName}
              </p>

              <p className="truncate text-xs text-muted">
                {review.reviewerEmail}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`h-4 w-4 ${
                  index < review.rating ? "fill-brand text-brand" : "text-line"
                }`}
              />
            ))}

            <span className="ml-2 text-sm font-medium text-ink">
              {review.rating}/5
            </span>
          </div>

          {/* Comment */}
          <div className="mt-4 rounded-lg bg-background p-4">
            <p className="text-sm leading-6 text-ink">“{review.comment}”</p>
          </div>

          {/* Tags */}
          {review.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {review.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Submitted */}
          <p className="mt-4 text-xs text-muted">
            Submitted {formatDate(review.submittedAt)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-2 lg:w-36 lg:flex-col">
          <button
            type="button"
            disabled={isModerating}
            onClick={onApprove}
            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 lg:w-full"
          >
            <Check className="h-4 w-4" />

            {isModerating ? "Processing..." : "Approve"}
          </button>

          <button
            type="button"
            disabled={isModerating}
            onClick={onReject}
            className="flex flex-1 items-center justify-center gap-2 rounded-md border border-line px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-50 lg:w-full"
          >
            <X className="h-4 w-4" />
            Reject
          </button>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPending = status === "PENDING";

  return (
    <span
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isPending ? "bg-brand-tint text-brand" : "bg-background text-muted"
      }`}
    >
      {status}
    </span>
  );
}

function RejectReviewModal({
  review,
  isSubmitting,
  onClose,
  onConfirm,
}: {
  review: AdminReview;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}) {
  const [reason, setReason] = useState("");

  const canSubmit = reason.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-review-title"
        className="w-full max-w-md rounded-xl border border-line bg-surface shadow-xl"
      >
        {/* Header */}
        <div className="border-b border-line px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="reject-review-title"
                className="font-serif text-xl font-medium text-ink"
              >
                Reject review
              </h2>

              <p className="mt-1 text-sm leading-5 text-muted">
                Provide a reason for rejecting this review.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-background hover:text-ink disabled:opacity-50"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-5 px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-ink">
              {review.listingTitle}
            </p>

            <p className="mt-1 text-xs text-muted">
              Submitted by {review.reviewerName}
            </p>
          </div>

          <div>
            <label
              htmlFor="rejection-reason"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Rejection reason
            </label>

            <textarea
              id="rejection-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Explain why this review cannot be published..."
              rows={4}
              disabled={isSubmitting}
              className="w-full resize-none rounded-md border border-line bg-background px-3 py-2.5 text-sm text-ink outline-none placeholder:text-muted focus:border-brand disabled:opacity-50"
            />

            <p className="mt-1.5 text-xs text-muted">
              This reason will be sent to the backend as the moderation reason.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-line px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-md px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!canSubmit || isSubmitting}
            onClick={() => onConfirm(reason.trim())}
            className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Rejecting..." : "Reject review"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewsLoading() {
  return (
    <div className="divide-y divide-line">
      {[1, 2, 3].map((item) => (
        <div key={item} className="animate-pulse p-6">
          <div className="h-4 w-24 rounded bg-background" />

          <div className="mt-3 h-6 w-72 rounded bg-background" />

          <div className="mt-6 h-10 w-48 rounded bg-background" />

          <div className="mt-5 h-20 w-full rounded-lg bg-background" />
        </div>
      ))}
    </div>
  );
}

function EmptyReviews() {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Check className="h-5 w-5" />
      </div>

      <h3 className="mt-4 font-serif text-lg font-medium text-ink">
        No pending reviews
      </h3>

      <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-muted">
        There are currently no reviews waiting for moderation.
      </p>
    </div>
  );
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-md border border-line px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}
