import { CheckCircle2 } from "lucide-react";

export default function PendingWithdrawalsEmpty() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
        <CheckCircle2 className="h-6 w-6 text-green-600" />
      </div>

      <h3 className="mt-4 font-semibold text-[#1C2541]">
        No pending withdrawals
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        There are currently no vouch withdrawal requests waiting for review.
      </p>
    </div>
  );
}
