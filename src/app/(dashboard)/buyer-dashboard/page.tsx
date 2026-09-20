import Link from "next/link";
import { ArrowRight, Search, MessageCircle, Clock3, Star } from "lucide-react";

const RECENT_REQUESTS = [
  {
    id: 1,
    listing: "Bhutanese Catering",
    provider: "Pema Dorji",
    status: "IN PROGRESS",
    message: "Catering for around 30 people for a family gathering.",
    time: "2h ago",
  },
  {
    id: 2,
    listing: "Airport Pickup",
    provider: "Karma Wangchuk",
    status: "COMPLETED",
    message: "Airport pickup from Sydney Airport.",
    time: "Yesterday",
  },
];

const RECOMMENDED_SERVICES = [
  {
    id: 1,
    title: "Bhutanese Catering",
    category: "Food & Catering",
    location: "Melbourne, VIC",
    price: "$25",
    priceUnit: "per person",
    rating: "4.9",
    reviews: 18,
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
    rating: "4.8",
    reviews: 12,
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
    rating: "5.0",
    reviews: 9,
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            Buyer dashboard
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Welcome back.
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Discover trusted services from the Bhutanese community and keep
            track of the people you've connected with.
          </p>
        </div>

        <Link
          href="/buyer-dashboard/services"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          <Search className="h-4 w-4" />
          Browse services
        </Link>
      </section>

      {/* Stats */}
      <section className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
        <BuyerStatCard
          label="Requests"
          value="4"
          description="2 active"
          icon={Clock3}
        />

        <BuyerStatCard
          label="Messages"
          value="6"
          description="2 unread"
          icon={MessageCircle}
        />

        <BuyerStatCard
          label="Saved services"
          value="8"
          description="Across 4 categories"
          icon={Search}
        />

        <BuyerStatCard
          label="Reviews"
          value="3"
          description="You've reviewed"
          icon={Star}
        />
      </section>

      {/* Requests + Quick actions */}
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
              href="/buyer-dashboard/requests"
              className="text-xs font-semibold text-brand hover:text-brand-dark"
            >
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {RECENT_REQUESTS.map((request) => (
              <BuyerRequestCard key={request.id} {...request} />
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="border border-line bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Explore
          </p>

          <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
            Find help from the community
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted">
            Browse services offered by Bhutanese providers across Australia.
          </p>

          <div className="mt-6 space-y-2">
            <Link
              href="/services"
              className="flex items-center justify-between border border-line px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:bg-brand-tint"
            >
              <span>Browse all services</span>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>

            <Link
              href="/buyer-dashboard/requests"
              className="flex items-center justify-between border border-line px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:bg-brand-tint"
            >
              <span>View my requests</span>
              <ArrowRight className="h-4 w-4 text-brand" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recommended services */}
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
              Discover
            </p>

            <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-ink">
              Services you might need
            </h2>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {RECOMMENDED_SERVICES.map((service) => (
            <BuyerServiceCard key={service.id} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}

function BuyerStatCard({
  label,
  value,
  description,
  icon: Icon,
}: {
  label: string;
  value: string;
  description: string;
  icon: typeof Clock3;
}) {
  return (
    <div className="bg-surface p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">
          {label}
        </p>

        <Icon className="h-4 w-4 text-brand" />
      </div>

      <p className="mt-3 font-serif text-3xl font-medium text-ink">{value}</p>

      <p className="mt-1 text-xs text-muted">{description}</p>
    </div>
  );
}

function BuyerRequestCard({
  listing,
  provider,
  status,
  message,
  time,
}: {
  listing: string;
  provider: string;
  status: string;
  message: string;
  time: string;
}) {
  return (
    <div className="border border-line p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">{listing}</p>

          <p className="mt-1 text-xs text-muted">{provider}</p>
        </div>

        <span className="shrink-0 text-[10px] font-semibold tracking-[0.08em] text-brand">
          {status}
        </span>
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-5 text-muted">
        {message}
      </p>

      <p className="mt-3 text-xs text-faint">{time}</p>
    </div>
  );
}

function BuyerServiceCard({
  title,
  category,
  location,
  price,
  priceUnit,
  rating,
  reviews,
  image,
}: {
  title: string;
  category: string;
  location: string;
  price: string;
  priceUnit: string;
  rating: string;
  reviews: number;
  image: string;
}) {
  return (
    <Link
      href="/services"
      className="group overflow-hidden border border-line bg-surface transition-colors hover:border-brand"
    >
      <div className="aspect-[16/10] overflow-hidden bg-background">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-brand">
          {category}
        </p>

        <h3 className="mt-2 font-serif text-xl font-medium text-ink">
          {title}
        </h3>

        <p className="mt-1 text-sm text-muted">{location}</p>

        <div className="mt-4 flex items-end justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-ink">{price}</span>

            <span className="ml-1 text-xs text-muted">{priceUnit}</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-muted">
            <Star className="h-3.5 w-3.5 fill-current text-brand" />
            <span className="font-semibold text-ink">{rating}</span>
            <span>({reviews})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
