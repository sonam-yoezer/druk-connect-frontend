"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";

const SERVICES = [
  "Tax returns",
  "Rental leads",
  "Moving help",
  "Childcare",
  "Dzongkha tutoring",
  "Car repairs",
  "Catering",
  "Airport pickups",
  "Resume reviews",
  "Hair & beauty",
  "Job referrals",
];

const PROVIDERS = [
  {
    initials: "BT",
    name: "Bhutanese Tax Help",
    category: "Tax & Accounting",
    location: "Sydney, NSW",
    rating: "4.9",
  },
  {
    initials: "HM",
    name: "Himalayan Moving",
    category: "Moving & Transport",
    location: "Melbourne, VIC",
    rating: "4.8",
  },
  {
    initials: "DA",
    name: "Druk Auto Care",
    category: "Car Services",
    location: "Brisbane, QLD",
    rating: "4.9",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line bg-background">
      {/* Background atmosphere */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-brand/5 blur-3xl" />

        <div className="absolute -bottom-40 -right-40 h-112.5 w-112.5 rounded-full bg-jade/4 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10 lg:py-28"
      >
        {/* ================================================= */}
        {/* LEFT SIDE */}
        {/* ================================================= */}

        <div className="relative z-10 max-w-xl">
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="mb-7 flex items-center gap-3"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Bhutanese marketplace in Australia
            </span>
          </motion.div>
          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-[48px] font-medium leading-[0.98] tracking-[-0.045em] text-ink sm:text-[62px] lg:text-[70px]"
          >
            Find people
            <br />
            <span className="relative text-brand">you can trust.</span>
          </motion.h1>
          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-lg text-base leading-7 text-muted sm:text-lg sm:leading-8"
          >
            Discover trusted services from Bhutanese providers across Australia
            — or put your own skills in front of a community that already
            understands you.
          </motion.p>
          {/* CTA */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/services"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
            >
              Browse services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <Link
              href="/auth/signup?role=lister"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-surface px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink"
            >
              <Tag className="h-4 w-4 text-muted transition-colors duration-200 group-hover:text-brand" />
              List your service
            </Link>
          </motion.div>
          {/* Trust points */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Check className="h-3.5 w-3.5 text-jade" />
              Free to join
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Check className="h-3.5 w-3.5 text-jade" />
              No listing fees
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-muted">
              <Check className="h-3.5 w-3.5 text-jade" />
              Community focused
            </div>
          </motion.div>
          {/* Community stats */}
          <motion.div
            variants={fadeUp}
            className="mt-8 flex items-center gap-7"
          >
            <div>
              <p className="font-serif text-2xl tracking-tight text-ink">
                2,400+
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                Buyers
              </p>
            </div>

            <div className="h-9 w-px bg-line-strong" />

            <div>
              <p className="font-serif text-2xl tracking-tight text-ink">
                150+
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                Providers
              </p>
            </div>

            <div className="h-9 w-px bg-line-strong" />

            <div>
              <p className="font-serif text-2xl tracking-tight text-ink">AU</p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-muted">
                Nationwide
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================================================= */}
        {/* RIGHT SIDE */}
        {/* ================================================= */}

        <motion.div
          variants={fadeUp}
          className="relative min-h-120 lg:min-h-140"
        >
          {/* Main marketplace frame */}
          <div className="absolute inset-x-0 top-5 mx-auto w-full max-w-147.5 lg:right-0 lg:mx-0">
            <div className="border border-line-strong bg-surface p-2 shadow-[0_30px_80px_rgba(0,0,0,0.09)]">
              <div className="border border-line bg-background">
                {/* Window header */}
                <div className="flex h-11 items-center justify-between border-b border-line px-4">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                    <span className="h-2 w-2 rounded-full bg-ink/15" />
                  </div>

                  <span className="hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-muted sm:block">
                    DrukConnect
                  </span>

                  <span className="text-[10px] text-muted">Australia</span>
                </div>

                {/* Marketplace header */}
                <div className="border-b border-line px-5 py-6 sm:px-7">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    <Search className="h-3.5 w-3.5" />
                    Find a service
                  </div>

                  <h2 className="mt-2 font-serif text-2xl tracking-tight text-ink sm:text-3xl">
                    What do you need help with?
                  </h2>

                  <div className="mt-5 flex h-11 items-center gap-3 border border-line-strong bg-surface px-3.5">
                    <Search className="h-4 w-4 text-muted" />

                    <span className="flex-1 text-xs text-muted">
                      Search services, providers...
                    </span>

                    <div className="flex h-7 w-7 items-center justify-center bg-brand text-white">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mt-4 flex gap-2 overflow-hidden">
                    {["Tax", "Moving", "Childcare", "Jobs", "Cars"].map(
                      (category, index) => (
                        <span
                          key={category}
                          className={`shrink-0 border px-2.5 py-1.5 text-[10px] font-medium ${
                            index === 0
                              ? "border-brand bg-brand/10 text-brand"
                              : "border-line bg-background text-muted"
                          }`}
                        >
                          {category}
                        </span>
                      ),
                    )}
                  </div>
                </div>

                {/* Results */}
                <div className="p-5 sm:p-7">
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">
                        Recommended
                      </p>

                      <p className="mt-1 text-sm font-semibold text-ink">
                        Trusted providers
                      </p>
                    </div>

                    <span className="text-[10px] text-muted">
                      150+ listings
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {PROVIDERS.map((provider, index) => (
                      <motion.div
                        key={provider.name}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                x: 25,
                              }
                        }
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                x: 0,
                              }
                        }
                        transition={{
                          delay: 0.6 + index * 0.15,
                          duration: 0.6,
                          ease: EASE,
                        }}
                        className="group flex items-center gap-3 border border-line bg-surface p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand/10 text-[10px] font-bold text-brand">
                          {provider.initials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <p className="truncate text-xs font-semibold text-ink">
                              {provider.name}
                            </p>

                            <ShieldCheck className="h-3 w-3 shrink-0 text-jade" />
                          </div>

                          <p className="mt-0.5 text-[10px] text-muted">
                            {provider.category}
                          </p>

                          <div className="mt-1 flex items-center gap-2 text-[9px] text-muted">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-2.5 w-2.5" />
                              {provider.location}
                            </span>

                            <span>•</span>

                            <span>★ {provider.rating}</span>
                          </div>
                        </div>

                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================= */}
          {/* Floating provider card */}
          {/* ============================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
              y: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: reduceMotion ? 0 : [0, -8, 0],
            }}
            transition={{
              opacity: {
                delay: 0.9,
                duration: 0.6,
              },
              x: {
                delay: 0.9,
                duration: 0.6,
              },
              y: {
                delay: 1.4,
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute -left-2.5 top-[28%] z-20 hidden border border-line-strong bg-background p-3 shadow-xl sm:block lg:-left-8.75"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-jade/10">
                <ShieldCheck className="h-4 w-4 text-jade" />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-ink">
                  Verified provider
                </p>

                <p className="mt-0.5 text-[9px] text-muted">
                  Community trusted
                </p>
              </div>
            </div>
          </motion.div>

          {/* ============================================= */}
          {/* Floating community card */}
          {/* ============================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
              y: 10,
            }}
            animate={{
              opacity: 1,
              x: 0,
              y: reduceMotion ? 0 : [0, 8, 0],
            }}
            transition={{
              opacity: {
                delay: 1,
                duration: 0.6,
              },
              x: {
                delay: 1,
                duration: 0.6,
              },
              y: {
                delay: 1.5,
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute bottom-[18%] -right-2.5 z-20 hidden border border-line-strong bg-background p-3 shadow-xl sm:block lg:-right-6.25"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center bg-brand/10">
                <Users className="h-4 w-4 text-brand" />
              </div>

              <div>
                <p className="text-[10px] font-semibold text-ink">
                  2,400+ buyers
                </p>

                <p className="mt-0.5 text-[9px] text-muted">Across Australia</p>
              </div>
            </div>
          </motion.div>

          {/* ============================================= */}
          {/* Bottom decorative label */}
          {/* ============================================= */}

          <motion.div
            variants={fadeUp}
            className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted lg:flex"
          >
            <span className="h-px w-8 bg-line-strong" />
            One community. Many services.
            <span className="h-px w-8 bg-line-strong" />
          </motion.div>
        </motion.div>
      </motion.div>
      <ServicesTicker paused={Boolean(reduceMotion)} />
    </section>
  );
}

function ServicesTicker({ paused }: { paused: boolean }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {SERVICES.map((service, index) => (
        <span key={index} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-sm font-medium text-muted">
            {service}
          </span>
          <span className="h-1.5 w-1.5 bg-line-strong" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative border-t border-line bg-surface/40 py-6 overflow-hidden">
      <div className="mx-auto max-w-7xl overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div
          className="flex w-max"
          animate={paused ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          {row}
          {row}
        </motion.div>
      </div>
    </div>
  );
}
