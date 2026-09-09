"use client";

import { Check, Clock, Mail } from "lucide-react";
import { BrandMark, cn, initialsOf } from "../Primitives";
import { SignupSteps } from "./SignupSteps";

const STATEMENTS = [
  {
    heading: "Everything you need, from people who've been here.",
    sub: "Rooms, work, gear and gatherings — shared between Bhutanese families across Australia.",
  },
  {
    heading: "A real inbox is the first proof you're real.",
    sub: "One code, once. It's how we keep throwaway accounts out of the marketplace.",
  },
  {
    heading: "People trade with people they recognise.",
    sub: "Two members vouching for you is worth more than any badge we could invent.",
  },
  {
    heading: "One last read, then you're in.",
    sub: "Short rules, written plainly, because they're the ones that actually get followed.",
  },
] as const;

const MEMBERS = [
  { name: "Pema Choden", color: "#4B45D1" },
  { name: "Karma Wangchuk", color: "#6D5BD0" },
  { name: "Sonam Lhamo", color: "#3E5BB8" },
  { name: "Ugyen Tshering", color: "#7B4FB5" },
];

interface BrandPanelProps {
  step: number;
  firstName: string;
  lastName: string;
  email: string;
}

export function BrandPanel({
  step,
  firstName,
  lastName,
  email,
}: BrandPanelProps) {
  const statement = STATEMENTS[Math.min(step, 4) - 1];

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[41%] min-w-95 max-w-135 flex-col justify-between overflow-hidden bg-panel px-11 py-10 text-panel-fg lg:flex">
      {" "}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(75,69,209,0.28),transparent_65%)]"
      />
      {/* Top */}
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-5">
          <span className="flex items-center gap-2.5">
            <BrandMark size={25} onDark />

            <span className="font-serif text-[20px] font-medium leading-none tracking-[-0.015em]">
              DrukConnect
            </span>
          </span>
        </div>

        <SignupSteps currentStep={step} tone="dark" />
      </div>
      {/* Statement */}
      <div className="relative">
        <p
          key={`statement-${step}`}
          className="animate-step max-w-[13ch] font-serif text-[34px] font-light leading-[1.18] tracking-[-0.022em]"
        >
          {statement.heading}
        </p>

        <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.65] text-panel-muted">
          {statement.sub}
        </p>
      </div>
      {/* Context */}
      <div className="relative border-t border-panel-line pt-6">
        {step === 1 && <RecentlyJoined />}
        {step === 2 && <MailPreview email={email} />}
        {step === 3 && <VouchExplainer />}
        {step === 4 && (
          <ProfilePreview firstName={firstName} lastName={lastName} />
        )}
      </div>
    </aside>
  );
}

/* ── Step 1 ───────────────────────────────────────────────── */

function RecentlyJoined() {
  return (
    <div className="animate-step">
      <p className="mb-3.5 text-[12.5px] text-panel-faint">Recently joined</p>

      <div className="flex items-center">
        {MEMBERS.map((member) => (
          <span
            key={member.name}
            style={{ backgroundColor: member.color }}
            className="-mr-2.5 grid h-8.5 w-8.5 place-items-center rounded-full border-2 border-panel text-[12px] font-medium text-white"
          >
            {initialsOf(member.name)}
          </span>
        ))}

        <span className="ml-5 text-[13.5px] text-panel-muted">
          1,240 members across Australia
        </span>
      </div>
    </div>
  );
}

/* ── Step 2 ───────────────────────────────────────────────── */

function MailPreview({ email }: { email: string }) {
  return (
    <div className="animate-step">
      <p className="mb-3.5 text-[12.5px] text-panel-faint">Code sent to</p>

      <div className="flex items-center gap-3 rounded-2xl border border-panel-line bg-panel-raise p-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/20 text-brand">
          <Mail className="h-4.25 w-4.25" strokeWidth={1.8} />
        </span>

        <div className="min-w-0">
          <p className="truncate text-[14px] font-medium">
            {email || "your inbox"}
          </p>

          <p className="mt-0.5 text-[12.5px] text-panel-faint">
            Delivered just now — check spam if it&apos;s missing
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 ───────────────────────────────────────────────── */

function VouchExplainer() {
  const slots = [
    { name: "Tashi Wangchuk", state: "done" as const },
    { name: "", state: "waiting" as const },
  ];

  return (
    <div className="animate-step">
      <p className="mb-3.5 text-[12.5px] text-panel-faint">Your vouches</p>

      <div className="grid grid-cols-2 gap-2.5">
        {slots.map((slot, index) => (
          <div
            key={index}
            className={cn(
              "rounded-2xl p-3.5",
              slot.state === "done"
                ? "border border-panel-line bg-panel-raise"
                : "border border-dashed border-panel-line",
            )}
          >
            {slot.state === "done" ? (
              <>
                <span className="mb-2.5 flex items-center justify-between">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-jade/20 text-[11px] font-semibold text-jade">
                    {initialsOf(slot.name)}
                  </span>

                  <Check className="h-4 w-4 text-jade" strokeWidth={2.4} />
                </span>

                <p className="truncate text-[13px] font-medium">{slot.name}</p>
                <p className="mt-0.5 text-[12px] text-jade">Vouched</p>
              </>
            ) : (
              <>
                <span className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-panel-line text-[12px] text-panel-faint">
                  2
                </span>

                <p className="text-[13px] font-medium text-panel-muted">
                  Open slot
                </p>

                <p className="mt-0.5 flex items-center gap-1 text-[12px] text-panel-faint">
                  <Clock className="h-3 w-3" strokeWidth={2} />
                  Ask someone
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step 4 ───────────────────────────────────────────────── */

function ProfilePreview({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) {
  const name = `${firstName} ${lastName}`.trim() || "Your name";

  return (
    <div className="animate-step">
      <p className="mb-3.5 text-[12.5px] text-panel-faint">
        How you&apos;ll appear
      </p>

      <div className="rounded-2xl border border-panel-line bg-panel-raise p-4">
        <div className="flex items-center gap-3.5">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand font-serif text-[19px] text-white">
            {initialsOf(name) || "DC"}
          </span>

          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium">{name}</p>

            <p className="mt-0.5 text-[12.5px] text-panel-faint">
              Lister — Australia
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-panel-line pt-3.5">
          <span className="rounded-full bg-jade/15 px-2.5 py-1 text-[11.5px] text-jade">
            Email verified
          </span>

          <span className="rounded-full bg-panel-fg/[0.07] px-2.5 py-1 text-[11.5px] text-panel-muted">
            1 of 2 vouches
          </span>
        </div>
      </div>
    </div>
  );
}
