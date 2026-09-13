import { ArrowUpRight } from "lucide-react";
import { Spotlight } from "../types/landing";

type SpotlightCardProps = {
  spotlight: Spotlight;
};

export function SpotlightCard({ spotlight }: SpotlightCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-brand-line hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <img
              src={spotlight.image}
              alt={spotlight.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-brand-tint"
            />

            <span
              className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-jade"
              aria-label="Verified community member"
            />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-serif text-[16px] font-semibold leading-tight text-ink">
              {spotlight.name}
            </h3>

            <p className="mt-1 text-xs text-muted">{spotlight.city}</p>
          </div>
        </div>

        <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <p className="text-sm leading-relaxed text-muted">
          {spotlight.description}{" "}
          <strong className="font-semibold text-jade">
            {spotlight.highlight}
          </strong>{" "}
          this year.
        </p>
      </div>
    </article>
  );
}
