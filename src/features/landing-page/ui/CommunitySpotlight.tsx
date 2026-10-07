"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";
import { spotlights } from "../types/landing";
import { SpotlightCard } from "./SpotlightCard";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
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
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
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

export function CommunitySpotlight() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line bg-background py-20 sm:py-24 lg:py-28">
      {/* Background atmosphere */}
      <motion.div
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand/8 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -25, 0],
                y: [0, 25, 0],
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
        className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-pine/5 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 25, 0],
                y: [0, -20, 0],
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

      {/* Grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[48px_48px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 max-w-2xl sm:mb-14 lg:mb-16"
        >
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, x: -10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.1,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-4 flex items-center gap-2"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Community heroes
            </span>
          </motion.div>

          <h2 className="font-serif text-[36px] font-medium leading-[1.08] tracking-tight text-ink sm:text-[44px] lg:text-[52px]">
            People making a{" "}
            <motion.span
              className="inline-block text-brand"
              initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.25,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              difference.
            </motion.span>
          </h2>

          <motion.p
            className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
            initial={reduceMotion ? undefined : { opacity: 0, y: 15 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.35,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Meet members of the Bhutanese community who share their time,
            skills, and knowledge to help others—no strings attached.
          </motion.p>
        </motion.div>

        {/* Community Spotlights */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6"
        >
          {spotlights.map((spotlight) => (
            <motion.div
              key={spotlight.name}
              variants={reduceMotion ? undefined : cardVariants}
              className="h-full"
            >
              <SpotlightCard spotlight={spotlight} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
