"use client";

import type { LucideIcon } from "lucide-react";

type TrustCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function TrustCard({ icon: Icon, title, description }: TrustCardProps) {
  return (
    <div className="relative h-full overflow-hidden bg-ink/80 p-7 sm:p-8 lg:p-9">
      {/* Icon */}
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-brand/20 bg-brand/10">
        <Icon className="h-5 w-5 text-brand" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-xl font-medium tracking-[-0.01em] text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-white/55">{description}</p>
    </div>
  );
}
