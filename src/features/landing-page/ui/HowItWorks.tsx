"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  MessageSquare,
  Search,
  Sparkles,
  UserPlus,
} from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Create your free account",
    description:
      "Sign up in seconds using your email or social logins. Membership is 100% free for everyone in the community.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Browse or list a service",
    description:
      "Search for trusted providers ranging from tax returns to moving help, or publish your own professional listing at zero cost.",
    icon: Search,
  },
  {
    step: "03",
    title: "Connect directly",
    description:
      "Message providers securely, discuss your needs, and get things done with fellow Bhutanese members across Australia.",
    icon: MessageSquare,
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

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HowItWorks() {
  return (
    <section className="relative border-b border-line bg-surface/30 py-20 sm:py-24 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="mb-3 flex items-center gap-2">
            <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-jade/10 px-3 text-xs font-semibold text-jade">
              <Sparkles className="h-3.5 w-3.5" /> Simple Process
            </span>
          </div>
          <h2 className="font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[50px]">
            How DrukConnect works for you
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg leading-relaxed">
            Whether you are settling into a new city or looking to grow your
            local client base, getting started takes less than a minute.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={stepVariants}
                className="relative flex flex-col justify-between rounded-[28px] border border-line bg-background p-8 sm:p-10 shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/6 text-brand border border-brand/10">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xl font-medium text-muted/50">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-ink tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-line/60 flex items-center gap-2 text-xs font-medium text-jade">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Verified & secure process</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Callout Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl border border-line bg-surface p-8 sm:px-10"
        >
          <div>
            <h4 className="text-lg font-semibold text-ink">
              Ready to join the community network?
            </h4>
            <p className="text-sm text-muted mt-1">
              Join thousands of Bhutanese members connecting across Australia
              today.
            </p>
          </div>
          <Link
            href="/auth/signup"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-sm font-medium text-white shadow-sm transition-all hover:bg-brand-dark"
          >
            Get started for free
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
