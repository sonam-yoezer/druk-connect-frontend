"use client";

import { useState } from "react";
import { useSubmitMicroFeedback } from "../hooks/useSubmitMicroFeedback";

const ratings = [
  { value: "EASY", label: "Easy", emoji: "😊" },
  { value: "NEUTRAL", label: "Okay", emoji: "😐" },
  { value: "DIFFICULT", label: "Difficult", emoji: "😟" },
] as const;

type Props = {
  onDone: () => void;
};

export default function MicroFeedbackForm({ onDone }: Props) {
  const [rating, setRating] =
    useState<(typeof ratings)[number]["value"]>("EASY");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync, isPending } = useSubmitMicroFeedback();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    try {
      await mutateAsync({
        rating,
        comment: comment.trim() || undefined,
      });

      onDone();
    } catch {
      setErrorMessage(
        "We couldn't submit your feedback. You can try again or skip.",
      );
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
          Quick feedback
        </p>

        <h1 className="mt-2 font-serif text-3xl font-medium text-ink">
          How was your experience?
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          Your feedback helps us make creating listings easier for everyone.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 border border-line bg-surface p-6 sm:p-8"
      >
        <fieldset>
          <legend className="text-sm font-semibold text-ink">
            How easy was it to create your listing?
          </legend>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {ratings.map((option) => {
              const selected = rating === option.value;

              return (
                <label
                  key={option.value}
                  className={`flex cursor-pointer flex-col items-center gap-2 rounded-md border p-3 transition-colors ${
                    selected
                      ? "border-brand bg-brand-tint"
                      : "border-line hover:border-brand"
                  }`}
                >
                  <input
                    type="radio"
                    name="rating"
                    value={option.value}
                    checked={selected}
                    onChange={() => setRating(option.value)}
                    className="sr-only"
                  />

                  <span className="text-2xl" aria-hidden="true">
                    {option.emoji}
                  </span>

                  <span className="text-sm font-medium text-ink">
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="micro-feedback-comment"
            className="text-sm font-semibold text-ink"
          >
            What could we improve?{" "}
            <span className="font-normal text-muted">(Optional)</span>
          </label>

          <textarea
            id="micro-feedback-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Tell us about anything that was confusing or difficult..."
            className="mt-2 w-full rounded-md border border-line bg-background px-3.5 py-3 text-sm text-ink outline-none placeholder:text-faint focus:border-brand"
          />

          <p className="mt-1 text-right text-xs text-muted">
            {comment.length}/1000
          </p>
        </div>

        {errorMessage && (
          <p role="alert" className="text-sm text-red-700">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onDone}
            className="inline-flex h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-semibold text-muted hover:bg-background"
          >
            Skip
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Submitting..." : "Submit feedback"}
          </button>
        </div>
      </form>
    </div>
  );
}
