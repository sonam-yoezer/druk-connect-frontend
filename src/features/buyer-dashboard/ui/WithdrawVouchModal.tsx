import { AlertCircle, X } from "lucide-react";

import type { GivenVouch } from "../types/vouchRequest";

type WithdrawVouchModalProps = {
  vouch: GivenVouch;
  reason: string;
  isSubmitting: boolean;
  error: string | null;
  onReasonChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function WithdrawVouchModal({
  vouch,
  reason,
  isSubmitting,
  error,
  onReasonChange,
  onClose,
  onSubmit,
}: WithdrawVouchModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="withdraw-vouch-title"
        className="w-full max-w-md rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2
              id="withdraw-vouch-title"
              className="text-lg font-semibold text-[#1C2541]"
            >
              Withdraw your vouch?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your request will be reviewed by an administrator.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Vouch for
            </p>

            <p className="mt-1 font-medium text-[#1C2541]">
              {vouch.listerName}
            </p>
          </div>

          <div className="mt-5">
            <label
              htmlFor="withdrawal-reason"
              className="mb-2 block text-sm font-medium text-[#1C2541]"
            >
              Reason for withdrawal
            </label>

            <textarea
              id="withdrawal-reason"
              value={reason}
              onChange={(event) => onReasonChange(event.target.value)}
              placeholder="Tell us why you can no longer vouch for this person..."
              rows={4}
              disabled={isSubmitting}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-[#1C2541] outline-none placeholder:text-gray-400 focus:border-[#7A2E33] focus:ring-2 focus:ring-[#7A2E33]/10 disabled:bg-gray-50"
            />

            <p className="mt-1.5 text-xs text-gray-400">
              Please provide a reason for the administrator to review.
            </p>
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={!reason.trim() || isSubmitting}
            className="rounded-lg bg-[#7A2E33] px-4 py-2 text-sm font-medium text-white hover:bg-[#68272C] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
}
