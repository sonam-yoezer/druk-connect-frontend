"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldCheck } from "lucide-react";

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
      // The mutation error is displayed by the modal.
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Page header */}
        <header>
          <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
            Manage vouches
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Manage the people you have vouched for in the community.
          </p>
        </header>

        {/* Summary */}
        <section
          aria-label="Vouch summary"
          className="relative overflow-hidden rounded-md border border-line bg-white p-4 sm:p-5"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#7A2E33]/10">
              <ShieldCheck
                aria-hidden="true"
                className="h-5 w-5 text-[#7A2E33]"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-muted">
                People you've vouched for
              </p>
              <p className="mt-1 text-2xl font-semibold leading-none tracking-tight text-ink">
                {totalVouchedUsers}
              </p>
            </div>

            <div className="hidden border-l border-line pl-4 sm:block">
              <p className="text-xs leading-5 text-muted">
                Trusted community
                <br />
                connections
              </p>
            </div>
          </div>
        </section>

        {/* Vouches */}
        <section aria-label="Your vouches">
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Your vouches
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted">
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
