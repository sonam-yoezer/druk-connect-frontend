"use client";

import { useState } from "react";
import { Check, Loader2, Plus, Star, X } from "lucide-react";
import { useSubmitReview } from "../hooks/useSubmitReview";
import { SubmitReviewData } from "../types/reviews";

type ReviewFormProps = {
  listingId: string;
  onSuccess?: () => void;
};

const MIN_COMMENT_LENGTH = 10;

export function ReviewForm({ listingId, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const submitReviewMutation = useSubmitReview(listingId);

  const isSubmitting = submitReviewMutation.isPending;

  const trimmedComment = comment.trim();

  const isValid = rating >= 1 && trimmedComment.length >= MIN_COMMENT_LENGTH;

  const handleAddTag = () => {
    const tag = tagInput.trim();

    if (!tag) {
      return;
    }

    if (tags.includes(tag)) {
      setTagInput("");
      return;
    }

    setTags((currentTags) => [...currentTags, tag]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((currentTags) => currentTags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid || isSubmitting) {
      return;
    }

    const data: SubmitReviewData = {
      rating,
      comment: trimmedComment,
      tags,
    };

    submitReviewMutation.mutate(data, {
      onSuccess: () => {
        onSuccess?.();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <label className="text-sm font-semibold text-ink">Your rating</label>

        <div
          className="mt-3 flex items-center gap-1"
          onMouseLeave={() => setHoveredRating(0)}
          role="radiogroup"
          aria-label="Rating"
        >
          {[1, 2, 3, 4, 5].map((value) => {
            const isActive = value <= (hoveredRating || rating);

            return (
              <button
                key={value}
                type="button"
                onMouseEnter={() => setHoveredRating(value)}
                onClick={() => setRating(value)}
                className="rounded-md p-1 transition-transform hover:scale-105"
                aria-label={`${value} star${value === 1 ? "" : "s"}`}
                aria-checked={rating === value}
                role="radio"
              >
                <Star
                  className={`h-7 w-7 transition-colors ${
                    isActive ? "fill-brand text-brand" : "text-line-strong"
                  }`}
                />
              </button>
            );
          })}

          {rating > 0 && (
            <span className="ml-2 text-sm text-muted">{rating} / 5</span>
          )}
        </div>
      </div>

      {/* Comment */}
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="review-comment"
            className="text-sm font-semibold text-ink"
          >
            Your experience
          </label>

          <span className="text-xs text-muted">{comment.length}/1000</span>
        </div>

        <textarea
          id="review-comment"
          value={comment}
          onChange={(event) => {
            if (event.target.value.length <= 1000) {
              setComment(event.target.value);
            }
          }}
          placeholder="What was your experience like?"
          rows={5}
          className="mt-2 w-full resize-none rounded-md border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
        />

        {comment.length > 0 && trimmedComment.length < MIN_COMMENT_LENGTH && (
          <p className="mt-1.5 text-xs text-red-600">
            Please write at least {MIN_COMMENT_LENGTH} characters.
          </p>
        )}
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="review-tag" className="text-sm font-semibold text-ink">
          Add tags
          <span className="ml-1 font-normal text-muted">(optional)</span>
        </label>

        <div className="mt-2 flex gap-2">
          <input
            id="review-tag"
            value={tagInput}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="e.g. Friendly, Reliable"
            className="h-11 min-w-0 flex-1 rounded-md border border-line bg-background px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-brand"
          />

          <button
            type="button"
            onClick={handleAddTag}
            disabled={!tagInput.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-line-strong text-ink transition-colors hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Add tag"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1.5 text-xs font-medium text-ink"
              >
                {tag}

                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="rounded-full text-muted transition-colors hover:text-ink"
                  aria-label={`Remove ${tag}`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {submitReviewMutation.isError && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-sm text-red-700">
            {submitReviewMutation.error instanceof Error
              ? submitReviewMutation.error.message
              : "Something went wrong while submitting your review. Please try again."}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || isSubmitting}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting review...
          </>
        ) : (
          <>
            <Check className="h-4 w-4" />
            Submit review
          </>
        )}
      </button>
    </form>
  );
}
