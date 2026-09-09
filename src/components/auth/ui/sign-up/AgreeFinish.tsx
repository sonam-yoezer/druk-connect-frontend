"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, StepHeading, cn } from "../Primitives";
import { GUIDELINES } from "../../constants/onboarding";

interface AgreeFinishProps {
  onFinish?: () => void;
  isLoading?: boolean;
}

export function AgreeFinish({ onFinish, isLoading = false }: AgreeFinishProps) {
  const [guidelinesAccepted, setGuidelinesAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const canFinish = guidelinesAccepted && termsAccepted;

  return (
    <div className="animate-step">
      <StepHeading
        title="Agree and finish"
        description="Three ground rules. They exist because this community is small enough that one bad actor is felt by everyone."
      />

      <ul className="rounded-xl border border-line bg-surface">
        {GUIDELINES.map((guideline, index) => {
          const Icon = guideline.icon;

          return (
            <li
              key={guideline.title}
              className={cn(
                "flex gap-3.5 p-4",
                index > 0 && "border-t border-line",
              )}
            >
              <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-tint text-brand">
                <Icon className="h-4.25 w-4.25" strokeWidth={1.8} />
              </span>

              <div>
                <p className="text-[14px] font-medium leading-5 text-ink">
                  {guideline.title}
                </p>

                <p className="mt-1 text-[13px] leading-5 text-muted">
                  {guideline.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 space-y-2.5">
        <Consent
          id="accept-guidelines"
          checked={guidelinesAccepted}
          onChange={setGuidelinesAccepted}
        >
          I&apos;ve read the community guidelines and I&apos;ll follow them.
        </Consent>

        <Consent
          id="accept-terms"
          checked={termsAccepted}
          onChange={setTermsAccepted}
        >
          I agree to the{" "}
          <Link
            href="/terms"
            className="font-medium text-ink underline decoration-line-strong underline-offset-[3px] transition hover:decoration-ink"
          >
            terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="font-medium text-ink underline decoration-line-strong underline-offset-[3px] transition hover:decoration-ink"
          >
            privacy policy
          </Link>
          , and I understand DrukConnect is a listing platform only — it
          doesn&apos;t verify, inspect or insure any service, and arrangements
          are made between members directly.
        </Consent>
      </div>

      <div className="mt-8">
        <Button
          type="button"
          fullWidth
          disabled={!canFinish}
          loading={isLoading}
          onClick={onFinish}
        >
          {isLoading ? "Setting up your account" : "Agree and finish"}
        </Button>
      </div>
    </div>
  );
}

function Consent({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer gap-3 rounded-xl border p-3.5 transition",
        checked
          ? "border-brand-line bg-brand-tint"
          : "border-line bg-surface hover:border-line-strong",
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className={cn(
          "mt-px grid h-4.5 w-4.5 shrink-0 appearance-none place-items-center rounded-md border transition",
          "after:h-2.25 after:w-1.25 after:rotate-45 after:border-b-2 after:border-r-2 after:border-white after:opacity-0 after:content-['']",
          checked
            ? "border-brand bg-brand after:opacity-100"
            : "border-line-strong bg-surface",
        )}
      />

      <span className="text-[13px] leading-5 text-muted">{children}</span>
    </label>
  );
}
