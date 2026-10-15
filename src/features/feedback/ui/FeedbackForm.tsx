"use client";

import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";

import { useSubmitFeedbackForm } from "../hooks/useSubmitFeedbackForm";
import type { FeedbackPerspective, FeedbackType } from "../types/feedback";

type Props = {
  onClose?: () => void;
};

export default function FeedbackForm({ onClose }: Props) {
  const [type, setType] = useState<FeedbackType>("BUG");
  const [perspective, setPerspective] = useState<FeedbackPerspective>("LISTER");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [screenshot, setScreenshot] = useState<File | undefined>();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [successMessage, setSuccessMessage] = useState("");

  const { mutateAsync, isPending, error, reset } = useSubmitFeedbackForm();

  useEffect(() => {
    if (!screenshot) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(screenshot);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [screenshot]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");

    try {
      const response = await mutateAsync({
        data: {
          type,
          perspective,
          message: message.trim(),
          anonymous,
        },
        screenshot,
      });

      setSuccessMessage(response.message);
      setMessage("");
      setScreenshot(undefined);
      reset();
    } catch {
      // The mutation error is displayed below.
    }
  }

  function handleScreenshotChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    reset();
    setScreenshot(file);
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-brand">
            DrukConnect
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-ink">
            Give feedback
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted">
            Report a problem or share an idea to help us improve DrukConnect.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close feedback form"
            className="rounded-md p-2 text-muted hover:bg-background"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {successMessage ? (
        <div
          role="status"
          className="space-y-4 rounded-lg border border-line p-5"
        >
          <h2 className="font-semibold text-ink">
            Feedback submitted successfully
          </h2>
          <p className="text-sm text-muted">{successMessage}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="feedback-type"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Feedback type
            </label>
            <select
              id="feedback-type"
              value={type}
              onChange={(event) => setType(event.target.value as FeedbackType)}
              className="w-full rounded-md border border-line bg-background px-3 py-3 text-sm text-ink"
            >
              <option value="BUG">Report a bug</option>
              <option value="SUGGESTION">Suggest an improvement</option>
              <option value="OTHER">Other feedback</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="feedback-perspective"
              className="mb-2 block text-sm font-medium text-ink"
            >
              I am using DrukConnect as
            </label>
            <select
              id="feedback-perspective"
              value={perspective}
              onChange={(event) =>
                setPerspective(event.target.value as FeedbackPerspective)
              }
              className="w-full rounded-md border border-line bg-background px-3 py-3 text-sm text-ink"
            >
              <option value="LISTER">Lister / Service provider</option>
              <option value="BUYER">Buyer</option>
              <option value="PROVIDER">Provider</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="feedback-message"
              className="mb-2 block text-sm font-medium text-ink"
            >
              Describe your feedback
            </label>
            <textarea
              id="feedback-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              minLength={1}
              maxLength={5000}
              rows={5}
              placeholder="Tell us what happened or what you would like to improve..."
              className="w-full resize-y rounded-md border border-line bg-background px-3 py-3 text-sm text-ink outline-none focus:border-brand"
            />
            <p className="mt-1 text-right text-xs text-muted">
              {message.length}/5000
            </p>
          </div>

          <div>
            <span className="mb-2 block text-sm font-medium text-ink">
              Screenshot{" "}
              <span className="font-normal text-muted">(optional)</span>
            </span>

            <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-line-strong p-4 hover:bg-background">
              <ImagePlus size={22} className="text-muted" />
              <span className="text-sm text-muted">
                {screenshot
                  ? "Choose a different screenshot"
                  : "Attach a screenshot"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleScreenshotChange}
                className="sr-only"
              />
            </label>

            {previewUrl && screenshot && (
              <div className="mt-3 rounded-md border border-line p-3">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="truncate text-sm text-ink">
                    {screenshot.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setScreenshot(undefined);
                      reset();
                    }}
                    className="text-sm text-muted hover:text-ink"
                  >
                    Remove
                  </button>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Screenshot preview"
                  className="max-h-64 rounded-md object-contain"
                />
              </div>
            )}
          </div>

          <label className="flex items-start gap-3 text-sm text-ink">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(event) => setAnonymous(event.target.checked)}
              className="mt-1"
            />
            <span>
              Submit anonymously
              <span className="mt-1 block text-muted">
                Your feedback will be submitted with the anonymous option
                enabled.
              </span>
            </span>
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-700">
              {error.message || "Unable to submit feedback. Please try again."}
            </p>
          )}

          <div className="flex justify-end gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className="rounded-md border border-line-strong px-5 py-3 text-sm font-semibold text-muted disabled:opacity-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isPending || !message.trim()}
              className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Submitting..." : "Submit feedback"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
