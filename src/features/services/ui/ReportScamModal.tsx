"use client";

import { X, Flag, LoaderCircle } from "lucide-react";

type ReportScamModalProps = {
  reason: string;
  details: string;
  error: string;
  isSubmitting: boolean;
  onReasonChange: (reason: string) => void;
  onDetailsChange: (details: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
};

const reportReasons = [
  { value: "SCAM", label: "Scam or fraud" },
  { value: "FAKE_LISTING", label: "Fake or misleading listing" },
  { value: "FRAUDULENT_PAYMENT", label: "Suspicious payment request" },
  { value: "IMPERSONATION", label: "Impersonation" },
  { value: "OTHER", label: "Other suspicious activity" },
];

export default function ReportScamModal({
  reason,
  details,
  error,
  isSubmitting,
  onReasonChange,
  onDetailsChange,
  onSubmit,
  onClose,
}: ReportScamModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/50 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-scam-title"
        className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div
              className="mb-3 flex h-10 w-10 items-center
              justify-center rounded-full bg-danger-tint"
            >
              <Flag className="h-5 w-5 text-danger" />
            </div>

            <h2
              id="report-scam-title"
              className="text-xl font-semibold text-gray-900"
            >
              Report suspicious activity
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Help us keep the DrukConnect community safe.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close report modal"
            className="rounded-md p-2 text-gray-500
              transition-colors hover:bg-gray-100
              disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="report-reason"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Reason for reporting
            </label>

            <select
              id="report-reason"
              value={reason}
              onChange={(event) => onReasonChange(event.target.value)}
              required
              disabled={isSubmitting}
              className="w-full rounded-lg border border-gray-300
                bg-white px-3 py-3 text-sm text-gray-900
                outline-none focus:border-primary focus:ring-2
                focus:ring-primary/20 disabled:opacity-60"
            >
              <option value="" disabled>
                Select a reason
              </option>

              {reportReasons.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="report-details"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Additional details
            </label>

            <textarea
              id="report-details"
              value={details}
              onChange={(event) => onDetailsChange(event.target.value)}
              placeholder="Explain what happened and why you believe this listing is suspicious..."
              rows={4}
              maxLength={1000}
              disabled={isSubmitting}
              className="w-full resize-y rounded-lg border
                border-gray-300 px-3 py-3 text-sm text-gray-900
                outline-none placeholder:text-gray-400
                focus:border-primary focus:ring-2
                focus:ring-primary/20 disabled:opacity-60"
            />

            <p className="mt-1 text-right text-xs text-gray-400">
              {details.length}/1000 characters
            </p>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-danger-tint p-3 text-sm text-danger"
            >
              {error}
            </p>
          )}

          <div
            className="flex flex-col-reverse gap-3 sm:flex-row
            sm:justify-end"
          >
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-lg border border-gray-300 px-4 py-3
                text-sm font-medium text-gray-700 transition-colors
                hover:bg-gray-50 disabled:cursor-not-allowed
                disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting || !reason}
              className="flex items-center justify-center gap-2
                rounded-lg bg-danger px-4 py-3 text-sm font-medium
                text-white transition-colors hover:opacity-90
                disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting && (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              )}

              {isSubmitting ? "Submitting..." : "Submit report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
