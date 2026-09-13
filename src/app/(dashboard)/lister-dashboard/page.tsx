import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { ReputationCard } from "@/src/components/lister-dashboard/ui/ReputationCard";
import { RequestCard } from "@/src/components/lister-dashboard/ui/RequestCard";
import { StatCard } from "@/src/components/lister-dashboard/ui/StatCard";
import { ListingCard } from "@/src/components/lister-dashboard/ui/ListingCard";

const LISTINGS = [
  {
    id: 1,
    title: "Bhutanese Catering",
    category: "Food",
    location: "Melbourne, VIC",
    price: "$25",
    priceUnit: "per person",
    views: 42,
    status: "ACTIVE" as const,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80",
  },
  {
    id: 2,
    title: "Airport Pickup",
    category: "Transport",
    location: "Sydney, NSW",
    price: "$40",
    priceUnit: "per trip",
    views: 31,
    status: "ACTIVE" as const,
    image:
      "https://images.unsplash.com/photo-1517840901100-8179e982acb7?w=900&q=80",
  },
  {
    id: 3,
    title: "Maths & Science Tutoring",
    category: "Tutoring",
    location: "Brisbane, QLD",
    price: "$30",
    priceUnit: "per hour",
    views: 18,
    status: "DRAFT" as const,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
  },
];

const REQUESTS = [
  {
    name: "Pema Dorji",
    listing: "Bhutanese Catering",
    message:
      "Hi, I need catering for around 30 people for a family gathering next weekend.",
    time: "2h ago",
  },
  {
    name: "Karma Wangchuk",
    listing: "Airport Pickup",
    message:
      "Would you be available for an airport pickup from Sydney Airport this Saturday?",
    time: "Yesterday",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Lister dashboard
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Good morning, Tashi.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Manage your listings, respond to buyers, and build your reputation
            in the community.
          </p>
        </div>

        <Link
          href="/lister-dashboard/listings/new"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <Plus className="h-4 w-4" />
          Create listing
        </Link>
      </section>

      <section className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active listings"
          value="3"
          description="2 updated recently"
        />

        <StatCard label="Total views" value="126" description="This month" />

        <StatCard
          label="Requests"
          value="4"
          description="2 need your attention"
        />

        <StatCard label="Rating" value="4.8" description="12 reviews" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <div className="border border-line bg-surface p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
                Activity
              </p>

              <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
                Recent requests
              </h2>
            </div>

            <Link
              href="/lister-dashboard/requests"
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              View all
            </Link>
          </div>

          <div className="mt-6">
            {REQUESTS.map((request) => (
              <RequestCard
                key={`${request.name}-${request.time}`}
                {...request}
              />
            ))}
          </div>
        </div>

        <ReputationCard />
      </section>

      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
              Your listings
            </p>

            <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
              Manage your services
            </h2>
          </div>

          <Link
            href="/lister-dashboard/listings"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.id} {...listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
