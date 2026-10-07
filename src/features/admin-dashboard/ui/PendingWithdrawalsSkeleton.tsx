export default function PendingWithdrawalsSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div>
        <div className="h-7 w-52 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-96 rounded bg-gray-100" />
      </div>

      <div className="h-24 w-full max-w-md rounded-2xl bg-gray-100" />

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="h-12 bg-gray-100" />

        <div className="divide-y divide-gray-100">
          <div className="h-24" />
          <div className="h-24" />
          <div className="h-24" />
        </div>
      </div>
    </div>
  );
}
