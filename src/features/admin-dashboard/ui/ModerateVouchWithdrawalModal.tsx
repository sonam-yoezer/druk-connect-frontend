"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

import type {
  ModerateVouchWithdrawalAction,
  PendingVouchWithdrawal,
} from "../types/vouchWithdrawal";

type ModerateVouchWithdrawalModalProps = {
  request: PendingVouchWithdrawal;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSubmit: (
    action: ModerateVouchWithdrawalAction,
    reason: string,
  ) => Promise<void>;
};

export default function ModerateVouchWithdrawalModal({
  request,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: ModerateVouchWithdrawalModalProps) {
  const [reason, setReason] = useState("");

  const handleSubmit = async (action: ModerateVouchWithdrawalAction) => {
    const trimmedReason = reason.trim();

    if (!trimmedReason) {
      return;
    }

    await onSubmit(action, trimmedReason);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="moderate-vouch-title"
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        <div className="flex items-start justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <h2
              id="moderate-vouch-title"
              className="text-lg font-semibold text-[#1C2541]"
            >
              Review withdrawal
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review the request before confirming your decision.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close"
            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Withdrawal request
            </p>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-400">Buyer</p>

                <p className="mt-1 text-sm font-medium text-[#1C2541]">
                  {request.buyerName}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {request.buyerEmail}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Lister</p>

                <p className="mt-1 text-sm font-medium text-[#1C2541]">
                  {request.listerName}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {request.listerEmail}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[#1C2541]">
              Buyer's reason
            </p>

            <div className="rounded-xl border border-gray-200 bg-white p-3 text-sm leading-6 text-gray-600">
              {request.reason}
            </div>
          </div>

          <div>
            <label
              htmlFor="moderation-reason"
              className="mb-2 block text-sm font-medium text-[#1C2541]"
            >
              Admin reason
            </label>

            <textarea
              id="moderation-reason"
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              placeholder="Add a reason for your decision..."
              rows={4}
              disabled={isSubmitting}
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-[#1C2541] outline-none transition placeholder:text-gray-400 focus:border-[#7A2E33] focus:ring-2 focus:ring-[#7A2E33]/10 disabled:cursor-not-allowed disabled:bg-gray-50"
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700">
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
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("REJECT")}
            disabled={!reason.trim() || isSubmitting}
            className="rounded-lg bg-[#7A2E33] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#68272C] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Reject withdrawal"}
          </button>

          <button
            type="button"
            onClick={() => handleSubmit("APPROVE")}
            disabled={!reason.trim() || isSubmitting}
            className="flex items-center gap-2 rounded-lg bg-[#2F4F3E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#264235] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />

            {isSubmitting ? "Submitting..." : "Approve withdrawal"}
          </button>
        </div>
      </div>
    </div>
  );
}
