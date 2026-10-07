"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { usePendingWithdrawals } from "./hooks/usePendingWithdrawals";
import { useModerateVouchWithdrawal } from "./hooks/useModerateVouchWithdrawal";

import type {
  ModerateVouchWithdrawalAction,
  PendingVouchWithdrawal,
} from "./types/vouchWithdrawal";

import AdminVouchWithdrawalTable from "./ui/AdminVouchWithdrawalTable";
import PendingWithdrawalsEmpty from "./ui/PendingWithdrawalsEmpty";
import PendingWithdrawalsError from "./ui/PendingWithdrawalsError";
import PendingWithdrawalsSkeleton from "./ui/PendingWithdrawalsSkeleton";

const PAGE_SIZE = 10;

export default function AdminVouchWithdrawalsPage() {
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = usePendingWithdrawals({
    page,
    size: PAGE_SIZE,
  });

  const moderateMutation = useModerateVouchWithdrawal();

  if (isLoading) {
    return <PendingWithdrawalsSkeleton />;
  }

  if (isError) {
    return (
      <PendingWithdrawalsError
        message={
          error instanceof Error
            ? error.message
            : "Something went wrong while loading pending withdrawals."
        }
      />
    );
  }

  const requests = data?.requests ?? [];

  const handleModerate = async (
    request: PendingVouchWithdrawal,
    action: ModerateVouchWithdrawalAction,
    reason: string,
  ) => {
    await moderateMutation.mutateAsync({
      withdrawalRequestId: request.withdrawalRequestId,
      action,
      reason,
    });

    await queryClient.invalidateQueries({
      queryKey: ["admin-pending-withdrawals"],
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader />

      <PendingWithdrawalsSummary total={data?.totalElements ?? 0} />

      {requests.length === 0 ? (
        <PendingWithdrawalsEmpty />
      ) : (
        <AdminVouchWithdrawalTable
          requests={requests}
          isSubmitting={moderateMutation.isPending}
          error={
            moderateMutation.error instanceof Error
              ? moderateMutation.error.message
              : null
          }
          onModerate={handleModerate}
        />
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={data.currentPage}
          totalPages={data.totalPages}
          hasNext={data.hasNext}
          hasPrevious={data.hasPrevious}
          onPrevious={() => setPage((current) => current - 1)}
          onNext={() => setPage((current) => current + 1)}
        />
      )}
    </div>
  );
}

function PageHeader() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-[#1C2541]">
        Vouch Withdrawals
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Review vouch withdrawal requests submitted by buyers.
      </p>
    </div>
  );
}

type PendingWithdrawalsSummaryProps = {
  total: number;
};

function PendingWithdrawalsSummary({ total }: PendingWithdrawalsSummaryProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">Pending withdrawals</p>

      <p className="mt-1 text-2xl font-semibold text-[#1C2541]">{total}</p>
    </div>
  );
}

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
