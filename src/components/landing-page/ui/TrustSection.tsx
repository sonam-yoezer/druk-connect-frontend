"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Clock3, Shield, Users } from "lucide-react";
import { TrustCard } from "./TrustCard";

const trustItems = [
  {
    icon: Shield,
    title: "Phone-verified members",
    description:
      "Everyone signs up with a verified phone number, so you know who you're talking to.",
  },
  {
    icon: Users,
    title: "Community vouching",
    description:
      "Providers need 2 vouches from members who know them before they can list — not just a phone number.",
  },
  {
    icon: Clock3,
    title: "No middlemen",
    description:
      "Contact providers directly through WhatsApp, phone, or email. We simply help you find them.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function TrustSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      {/* Background atmosphere */}
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, 35, 0],
                y: [0, -25, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="pointer-events-none absolute -right-40 top-0 h-80 w-80 rounded-full bg-pine/20 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : {
                x: [0, -30, 0],
                y: [0, 30, 0],
                scale: [1, 1.1, 1],
              }
        }
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:48px_48px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        {/* Header */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 max-w-2xl sm:mb-14 lg:mb-16"
        >
          <motion.p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand"
            animate={
              reduceMotion
                ? undefined
                : {
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Built on trust
          </motion.p>

          <h2 className="font-serif text-[36px] font-medium leading-[1.08] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[52px]">
            A community you can
            <span className="text-brand"> trust.</span>
          </h2>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
            DrukConnect is designed around real community connections, so
            finding a service doesn't have to mean taking a chance.
          </p>
        </motion.div>

        {/* Trust Cards */}
        <motion.div
          variants={containerVariants}
          initial={reduceMotion ? undefined : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3"
        >
          {trustItems.map((item) => (
            <motion.div key={item.title} variants={itemVariants}>
              <TrustCard
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
