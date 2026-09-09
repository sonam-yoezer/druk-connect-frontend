import { IncomingVouchRequests } from "@/src/components/buyer-dashboard/ui/IncomingVouchRequests";

export default function RequestsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div>
        <p className="text-sm font-medium text-muted">Your requests</p>

        <h1 className="mt-1 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Vouch requests
        </h1>

        <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
          Members who have asked you to vouch for them will appear here.
        </p>
      </div>

      <section className="mt-8">
        <IncomingVouchRequests />
      </section>
    </div>
  );
}
