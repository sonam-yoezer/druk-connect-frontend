import { AlertCircle } from "lucide-react";

type PendingWithdrawalsErrorProps = {
  message: string;
};

export default function PendingWithdrawalsError({
  message,
}: PendingWithdrawalsErrorProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>

        <h2 className="text-lg font-semibold text-[#1C2541]">
          Unable to load pending withdrawals
        </h2>

        <p className="mt-2 text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
}
