"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ListingCard } from "./ListingCard";
import { listings } from "../types/landing";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function RecentListings() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand/8 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 25, 0],
                y: [0, -20, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-pine/5 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 20, 0],
                scale: [1, 1.06, 1],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{
            once: true,
            margin: "-100px",
          }}
          className="mb-12 flex flex-col justify-between gap-6 sm:mb-14 md:flex-row md:items-end lg:mb-16"
        >
          <div className="max-w-2xl">
            <motion.p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand"
              initial={reduceMotion ? undefined : { opacity: 0 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
                duration: 0.5,
              }}
            >
              Fresh from the community
            </motion.p>

            <h2 className="font-serif text-[36px] font-medium leading-[1.08] tracking-[-0.025em] text-ink sm:text-[44px] lg:text-[52px]">
              Recently{" "}
              <motion.span
                className="inline-block text-brand"
                initial={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                whileInView={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                viewport={{ once: true }}
                transition={{
                  delay: 0.25,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                posted.
              </motion.span>
            </h2>

            <motion.p
              className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 15,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Discover the latest services, opportunities, and listings shared
              by the Bhutanese community across Australia.
            </motion.p>
          </div>

          <Link
            href="/services"
            className="group hidden shrink-0 items-center gap-2 rounded-md border border-line bg-background px-5 py-2.5 text-sm font-medium text-ink transition-all duration-200 hover:border-brand/40 hover:bg-brand hover:text-white md:inline-flex"
          >
            View all services
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Listings */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {listings.map((listing) => (
            <motion.div
              key={listing.title}
              variants={reduceMotion ? undefined : cardVariants}
              className="h-full"
            >
              <ListingCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA */}
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 15,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 0.5,
          }}
          className="mt-8 sm:hidden"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-brand"
          >
            View all listings
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
