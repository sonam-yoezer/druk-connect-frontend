"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGivenVouches } from "../hooks/useGivenVouches";
import { useWithdrawVouch } from "../hooks/useWithdrawVouch";
import { GivenVouch } from "../types/vouchRequest";
import ManageVouchesSkeleton from "./ManageVouchesSkeleton";
import VouchesError from "./VouchesError";
import EmptyVouches from "./EmptyVouches";
import WithdrawVouchModal from "./WithdrawVouchModal";
import VouchCard from "./VouchCard";

export default function ManageVouchesPage() {
  const { data, isLoading, isError, error } = useGivenVouches();

  const queryClient = useQueryClient();
  const withdrawVouchMutation = useWithdrawVouch();

  const [selectedVouch, setSelectedVouch] = useState<GivenVouch | null>(null);

  const [withdrawalReason, setWithdrawalReason] = useState("");

  if (isLoading) {
    return <ManageVouchesSkeleton />;
  }

  if (isError) {
    return (
      <VouchesError
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while loading your vouches."
        }
      />
    );
  }

  const vouches = data?.vouches ?? [];
  const totalVouchedUsers = data?.totalVouchedUsers ?? 0;

  const handleOpenWithdrawal = (vouch: GivenVouch) => {
    setSelectedVouch(vouch);
    setWithdrawalReason("");
    withdrawVouchMutation.reset();
  };

  const handleCloseWithdrawal = () => {
    if (withdrawVouchMutation.isPending) {
      return;
    }

    setSelectedVouch(null);
    setWithdrawalReason("");
    withdrawVouchMutation.reset();
  };

  const handleSubmitWithdrawal = async () => {
    if (!selectedVouch || !withdrawalReason.trim()) {
      return;
    }

    try {
      await withdrawVouchMutation.mutateAsync({
        vouchId: selectedVouch.vouchId,
        reason: withdrawalReason.trim(),
      });

      await queryClient.invalidateQueries({
        queryKey: ["given-vouches"],
      });

      handleCloseWithdrawal();
    } catch {
      // Mutation error is displayed by the modal.
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#1C2541]">
            Manage Vouches
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the people you have vouched for in the community.
          </p>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#7A2E33]/10">
              <svg
                className="h-5 w-5 text-[#7A2E33]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>

            <div>
              <p className="text-sm text-gray-500">People you've vouched for</p>

              <p className="mt-1 text-2xl font-semibold text-[#1C2541]">
                {totalVouchedUsers}
              </p>
            </div>
          </div>
        </div>

        {/* Vouches */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-[#1C2541]">
              Your vouches
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              People you've vouched for as a trusted member.
            </p>
          </div>

          {vouches.length === 0 ? (
            <EmptyVouches />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {vouches.map((vouch) => (
                <VouchCard
                  key={vouch.vouchId}
                  vouch={vouch}
                  onWithdraw={() => handleOpenWithdrawal(vouch)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {selectedVouch && (
        <WithdrawVouchModal
          vouch={selectedVouch}
          reason={withdrawalReason}
          isSubmitting={withdrawVouchMutation.isPending}
          error={
            withdrawVouchMutation.error instanceof Error
              ? withdrawVouchMutation.error.message
              : null
          }
          onReasonChange={setWithdrawalReason}
          onClose={handleCloseWithdrawal}
          onSubmit={handleSubmitWithdrawal}
        />
      )}
    </>
  );
}
