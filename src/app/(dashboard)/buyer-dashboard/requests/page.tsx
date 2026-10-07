import { IncomingVouchRequests } from "@/src/features/buyer-dashboard/ui/IncomingVouchRequests";

export default function RequestsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header>
        <p className="text-sm font-medium text-muted">Your requests</p>

        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Vouch requests
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          Review requests from members who would like you to vouch for them.
        </p>
      </header>

      <section className="mt-8" aria-label="Vouch requests">
        <IncomingVouchRequests />
      </section>
    </div>
  );
}
