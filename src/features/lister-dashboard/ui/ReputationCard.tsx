import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

export function ReputationCard() {
  return (
    <section className="border border-line bg-surface p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">
            Your reputation
          </p>

          <h2 className="mt-2 font-serif text-xl font-medium tracking-tight text-ink">
            Build trust with the community.
          </h2>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-ink">
          <Star className="h-4 w-4 fill-current" />
          4.8
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5">
        <div>
          <p className="text-xl font-semibold text-ink">12</p>
          <p className="mt-1 text-xs text-muted">Reviews</p>
        </div>

        <div>
          <p className="text-xl font-semibold text-ink">2</p>
          <p className="mt-1 text-xs text-muted">Vouches</p>
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-ink">Profile completeness</span>
          <span className="text-muted">80%</span>
        </div>

        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-tint">
          <div className="h-full w-[80%] bg-brand" />
        </div>
      </div>

      <Link
        href="/dashboard/profile"
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark"
      >
        Complete your profile
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
