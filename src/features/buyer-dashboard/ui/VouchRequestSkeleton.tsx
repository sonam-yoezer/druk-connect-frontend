export default function VouchRequestSkeleton() {
  return (
    <div className="space-y-3" aria-label="Loading vouch requests">
      <div className="rounded-xl border border-line bg-surface px-4 py-3">
        <div className="animate-pulse">
          <div className="h-4 w-32 rounded bg-line" />
          <div className="mt-2 h-3 w-64 rounded bg-line" />
        </div>
      </div>

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-line bg-surface p-5"
        >
          <div className="animate-pulse">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 rounded-full bg-line" />

              <div className="flex-1">
                <div className="h-4 w-32 rounded bg-line" />

                <div className="mt-2 h-3 w-48 rounded bg-line" />
              </div>

              <div className="h-6 w-16 rounded-full bg-line" />
            </div>

            <div className="mt-4 rounded-xl bg-background p-4">
              <div className="h-3 w-16 rounded bg-line" />

              <div className="mt-2 h-4 w-full rounded bg-line" />

              <div className="mt-2 h-4 w-3/4 rounded bg-line" />
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <div className="h-3 w-36 rounded bg-line" />

              <div className="flex gap-2">
                <div className="h-10 w-20 rounded-xl bg-line" />
                <div className="h-10 w-20 rounded-xl bg-line" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
