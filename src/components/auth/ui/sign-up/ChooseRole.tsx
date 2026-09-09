"use client";

import { ArrowRight, BriefcaseBusiness, ShoppingBag } from "lucide-react";

type SignupRole = "BUYER" | "LISTER";

type ChooseRoleProps = {
  onSelect: (role: SignupRole) => void;
};

export function ChooseRole({ onSelect }: ChooseRoleProps) {
  return (
    <div className="w-full">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-maroon text-white">
          <span className="text-lg font-semibold">D</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          Join DrukConnect
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
          How do you want to use DrukConnect? Choose the option that best
          describes what you want to do here.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onSelect("BUYER")}
          className="group rounded-2xl border border-line bg-surface p-6 text-left transition-all hover:-translate-y-0.5 hover:border-maroon hover:shadow-md"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
            <ShoppingBag className="h-6 w-6" />
          </div>

          <h2 className="text-lg font-semibold text-ink">I'm a Buyer</h2>

          <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
            Discover trusted products and services from the community.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-maroon">
            Continue as Buyer
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </button>

        <button
          type="button"
          onClick={() => onSelect("LISTER")}
          className="group rounded-2xl border border-line bg-surface p-6 text-left transition-all hover:-translate-y-0.5 hover:border-maroon hover:shadow-md"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-maroon/10 text-maroon">
            <BriefcaseBusiness className="h-6 w-6" />
          </div>

          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold text-ink">I'm a Lister</h2>

            <span className="rounded-full bg-maroon/10 px-2.5 py-1 text-[11px] font-medium text-maroon">
              Vouched
            </span>
          </div>

          <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
            List your products and services and build trust with the community.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-maroon">
            Become a Lister
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </button>
      </div>

      <p className="mt-8 text-center text-sm text-muted">
        Already have an account?{" "}
        <a
          href="/auth/signin"
          className="font-semibold text-maroon hover:underline"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
