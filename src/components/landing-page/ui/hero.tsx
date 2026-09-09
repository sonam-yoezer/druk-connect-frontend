import Link from "next/link";
import { ArrowUpRight, Check, ShieldCheck, Users } from "lucide-react";

/**
 * Right-side photos are free-license Unsplash placeholders (credit: Brian
 * Kungu @oldceltic, Priscilla Du Preez @priscilladupreez — Unsplash
 * License, free for commercial use). Swap these for real photography of
 * the Bhutanese community in Australia before shipping; generic stock
 * photography works as a stand-in but won't carry the same weight as
 * actual members and events.
 */
const PHOTO_MAIN =
  "https://images.unsplash.com/photo-1768244016879-a0f41e01281c?w=900&q=80&auto=format&fit=crop";
const PHOTO_SECONDARY =
  "https://images.unsplash.com/photo-1768244016479-756ee49fe26c?w=700&q=80&auto=format&fit=crop";
const PHOTO_ACCENT =
  "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&q=80&auto=format&fit=crop";

const TRUST_POINTS = [
  "Free to join",
  "No fees to list a service",
  "Run by the community, for the community",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-background">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:px-10 lg:py-28">
        {/* Left */}
        <div className="max-w-2xl">
          <h1 className="max-w-[11ch] font-serif text-[44px] font-medium leading-[1.08] tracking-[-0.02em] text-ink sm:text-[56px] lg:text-[64px]">
            People you know. Help you can trust.
          </h1>

          <p className="mt-7 max-w-[46ch] text-base leading-7 text-muted sm:text-lg sm:leading-8">
            DrukConnect connects Bhutanese communities across Australia with
            trusted services, honest recommendations, and each other.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/services"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              Browse services
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/auth/signup"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line-strong bg-surface px-5 text-sm font-medium text-ink transition-colors hover:bg-background"
            >
              Join DrukConnect
            </Link>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:flex-wrap sm:gap-x-7 sm:gap-y-3">
            {TRUST_POINTS.map((point) => (
              <span
                key={point}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Check className="h-3.5 w-3.5 shrink-0 text-jade" />
                {point}
              </span>
            ))}
          </div>
        </div>

        {/* Right — a layered collage of real people, not a diagram of them */}
        <div className="relative mx-auto w-full max-w-[440px]">
          <div className="relative aspect-[4/5] w-full">
            {/* a gold frame peeking out behind the main photo */}
            <div className="hn-el absolute right-[-10px] top-[-10px] h-[76%] w-[70%] rounded-[28px] bg-[#DDA13B]/35" />

            {/* main photo */}
            <div className="hn-el absolute right-0 top-0 z-10 h-[76%] w-[70%] overflow-hidden rounded-[28px] shadow-xl">
              <img
                src={PHOTO_MAIN}
                alt="A member of the Bhutanese community in Australia, part of the DrukConnect network"
                className="h-full w-full object-cover"
                loading="lazy"
              />

              <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-jade px-3 py-1.5 text-white shadow-md">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Verified member</span>
              </div>
            </div>

            {/* secondary photo, overlapping bottom-left */}
            <div className="hn-el absolute bottom-0 left-0 z-20 h-[48%] w-[54%] -rotate-2 overflow-hidden rounded-3xl border-4 border-surface shadow-lg">
              <img
                src={PHOTO_SECONDARY}
                alt="Bhutanese community members gathered together"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* small accent photo, tucked behind the secondary */}
            <div className="hn-el absolute bottom-[30%] left-[-6%] z-30 h-[30%] w-[32%] rotate-6 overflow-hidden rounded-2xl border-4 border-surface shadow-lg">
              <img
                src={PHOTO_ACCENT}
                alt="Friends and neighbours talking and laughing together"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="hn-el mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 shadow-sm">
            <Users className="h-4 w-4 shrink-0 text-brand" />
            <span className="text-sm text-muted">
              A growing community across Australia
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hn-el { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: no-preference) {
          .hn-el {
            animation: hn-in 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          .hn-el:nth-of-type(1) { animation-delay: 0ms; }
          .hn-el:nth-of-type(2) { animation-delay: 90ms; }
          .hn-el:nth-of-type(3) { animation-delay: 180ms; }
          .hn-el:nth-of-type(4) { animation-delay: 270ms; }
          .hn-el:nth-of-type(5) { animation-delay: 380ms; }
        }
        @keyframes hn-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
}
