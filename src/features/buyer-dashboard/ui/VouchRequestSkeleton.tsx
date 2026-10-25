export default function VouchRequestSkeleton() {
  return (
    <div
      className="overflow-hidden border border-line rounded-md bg-surface"
      aria-label="Loading vouch requests"
      role="status"
    >
      {/* Table heading skeleton */}
      <div className="flex items-center justify-between gap-3 border-b rounded-md border-line px-4 py-4 sm:px-5">
        <div className="space-y-2">
          <div className="h-4 w-36 animate-pulse rounded bg-line/60" />
          <div className="h-3 w-48 animate-pulse rounded bg-line/40" />
        </div>

        <div className="h-4 w-20 animate-pulse rounded bg-line/50" />
      </div>

      {/* Table skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] table-fixed text-left">
          <thead>
            <tr className="border-b border-line bg-background/60">
              <th className="w-[22%] px-5 py-3">
                <div className="h-3 w-12 rounded bg-line/50" />
              </th>
              <th className="w-[38%] px-5 py-3">
                <div className="h-3 w-16 rounded bg-line/50" />
              </th>
              <th className="w-[15%] px-4 py-3">
                <div className="h-3 w-12 rounded bg-line/50" />
              </th>
              <th className="w-[25%] px-5 py-3">
                <div className="ml-auto h-3 w-14 rounded bg-line/50" />
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-line">
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <td className="px-5 py-4">
                  <div className="h-4 w-28 max-w-full animate-pulse rounded bg-line/50" />
                </td>
                <td className="px-5 py-4">
                  <div className="h-4 w-4/5 max-w-full animate-pulse rounded bg-line/40" />
                </td>
                <td className="px-4 py-4">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-line/40" />
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <div className="h-9 w-[58px] animate-pulse rounded-md bg-line/50" />
                    <div className="h-9 w-[64px] animate-pulse rounded-md bg-line/40" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer skeleton */}
      <div className="border-t border-line px-5 py-3">
        <div className="h-3 w-24 animate-pulse rounded bg-line/40" />
      </div>

      <span className="sr-only">Loading your requests...</span>
    </div>
  );
}
