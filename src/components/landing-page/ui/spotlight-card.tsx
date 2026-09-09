import { Spotlight } from "../types/landing";

type SpotlightCardProps = {
  spotlight: Spotlight;
};

export function SpotlightCard({ spotlight }: SpotlightCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-[5px] border border-line bg-white p-5">
      <img
        src={spotlight.image}
        alt={spotlight.name}
        className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0">
        <b className="block font-serif text-[15px] font-semibold">
          {spotlight.name}
        </b>

        <span className="text-xs text-slate">{spotlight.city}</span>

        <p className="mt-2 text-[13px] leading-[1.5] text-slate">
          {spotlight.description}{" "}
          <strong className="font-bold text-pine">{spotlight.highlight}</strong>{" "}
          this year
        </p>
      </div>
    </div>
  );
}
