import { IncomingVouchRequests } from "@/src/features/buyer-dashboard/ui/IncomingVouchRequests";

export default function RequestsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Vouch requests
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
          Review requests from members who would like you to vouch for them.
        </p>
      </header>

      <section aria-label="Vouch requests">
        <IncomingVouchRequests />
      </section>
    </div>
  );
}
