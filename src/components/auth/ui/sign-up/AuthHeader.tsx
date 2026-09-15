"use client";

import Link from "next/link";
import { BrandMark } from "../Primitives";
import { SignupSteps } from "../sign-up/SignupSteps";

interface AuthHeaderProps {
  step: number;
}

export function AuthHeader({ step }: AuthHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-background/85 px-6 pb-3.5 pt-4 backdrop-blur-md lg:hidden">
      <div className="mb-3 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg text-ink"
          aria-label="DrukConnect home"
        >
          <BrandMark size={22} />

          <span className="font-serif text-[18px] font-medium leading-none tracking-[-0.015em]">
            DrukConnect
          </span>
        </Link>

        <span className="shrink-0 text-[13px] tabular-nums text-faint">
          Step {step} of 4
        </span>
      </div>

<SignupSteps
  currentStep={step}
  totalSteps={4}
  showLabel={false}
/>    </header>
  );
}
