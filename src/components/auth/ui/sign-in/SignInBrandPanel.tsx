"use client";

import { Users } from "lucide-react";
import { BrandMark } from "../Primitives";

const MEMBERS = [
  { name: "Pema Choden", initials: "PC" },
  { name: "Karma Wangchuk", initials: "KW" },
  { name: "Sonam Lhamo", initials: "SL" },
];

export function SignInBrandPanel() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-[41%] min-w-95 max-w-135 flex-col justify-between overflow-hidden bg-panel px-11 py-10 text-panel-fg lg:flex">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(75,69,209,0.28),transparent_65%)]"
      />

      {/* Top */}
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <BrandMark size={25} onDark />

          <span className="font-serif text-[20px] font-medium leading-none tracking-[-0.015em]">
            DrukConnect
          </span>
        </div>
      </div>

      {/* Main message */}
      <div className="relative">
        <p className="max-w-[13ch] font-serif text-[34px] font-light leading-[1.18] tracking-[-0.022em]">
          Good to have you back.
        </p>

        <p className="mt-4 max-w-[34ch] text-[14px] leading-[1.65] text-panel-muted">
          Your community is still here. Sign in to pick up where you left off
          and connect with people you know.
        </p>
      </div>

      {/* Context */}
      <div className="relative border-t border-panel-line pt-6">
        <p className="mb-3.5 text-[12.5px] text-panel-faint">Your community</p>

        <div className="flex items-center">
          <div className="flex items-center">
            {MEMBERS.map((member, index) => (
              <span
                key={member.name}
                className={[
                  "grid h-8.5 w-8.5 place-items-center rounded-full",
                  "border-2 border-panel bg-brand text-[11px] font-medium text-white",
                  index > 0 ? "-ml-2.5" : "",
                ].join(" ")}
              >
                {member.initials}
              </span>
            ))}
          </div>

          <div className="ml-5 flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-panel-faint" strokeWidth={1.8} />

            <span className="text-[13.5px] text-panel-muted">
              Your trusted community awaits
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
