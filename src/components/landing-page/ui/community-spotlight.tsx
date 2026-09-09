import { spotlights } from "../types/landing";
import { SpotlightCard } from "./spotlight-card";

export function CommunitySpotlight() {
  return (
    <section className="border-y border-line bg-paper-raised py-14">
      <div className="wrap">
        <div className="mb-8">
          <h2 className="font-serif text-[30px] font-medium leading-[1.1]">
            Community spotlight
          </h2>

          <p className="mt-1.5 text-[15px] text-slate">
            Members who've been offering their time and skills for free, no
            strings attached.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
          {spotlights.map((spotlight) => (
            <SpotlightCard key={spotlight.name} spotlight={spotlight} />
          ))}
        </div>
      </div>
    </section>
  );
}
