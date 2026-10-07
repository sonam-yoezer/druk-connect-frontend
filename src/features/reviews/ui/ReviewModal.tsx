"use client";

import { Star, X } from "lucide-react";
import { useState } from "react";
import type { ListingDetails } from "../../listing/types/listing";
import { SubmitReviewData } from "../types/reviews";

type ReviewModalProps = {
  listing: ListingDetails;
  onClose: () => void;
  onSubmit: (data: SubmitReviewData) => void;
  isSubmitting?: boolean;
};

const REVIEW_TAGS = [
  "Helpful",
  "Friendly",
  "Reliable",
  "Professional",
  "Good communication",
  "Good value",
];

export function ReviewModal({
  listing,
  onClose,
  onSubmit,
  isSubmitting = false,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
  };

  const handleSubmit = () => {
    if (rating === 0 || isSubmitting) {
      return;
    }

    onSubmit({
      rating,
      comment: comment.trim(),
      tags,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-lg border border-line bg-surface p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-xl font-medium text-ink">
              Share your experience
            </h2>

            <p className="mt-1 text-sm text-muted">
              How was your experience with {listing.lister.name}?
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close review modal"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted transition-colors hover:bg-background hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Rating */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">Your rating</p>

          <div className="mt-3 flex gap-2">
            {Array.from({ length: 5 }, (_, index) => {
              const star = index + 1;
              const isActive = star <= rating;

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  disabled={isSubmitting}
                  aria-label={`${star} star${star > 1 ? "s" : ""}`}
                  className="transition-transform hover:scale-110 disabled:cursor-not-allowed"
                >
                  <Star
                    className={`h-7 w-7 ${
                      isActive ? "fill-brand text-brand" : "text-line-strong"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">
            What stood out?
            <span className="ml-1 font-normal text-muted">(optional)</span>
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {REVIEW_TAGS.map((tag) => {
              const selected = tags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  disabled={isSubmitting}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    selected
                      ? "border-brand bg-brand-tint text-brand"
                      : "border-line-strong bg-background text-muted hover:border-brand hover:text-brand"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment */}
        <div className="mt-6">
          <label
            htmlFor="review-comment"
            className="text-sm font-semibold text-ink"
          >
            Your experience
            <span className="ml-1 font-normal text-muted">(optional)</span>
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tell the community about your experience..."
            rows={4}
            disabled={isSubmitting}
            className="mt-2 w-full resize-none rounded-md border border-line bg-background px-3 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-md border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit review"}
          </button>
        </div>
      </div>
    </div>
  );
}
