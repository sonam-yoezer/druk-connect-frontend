"use client";

import { cn } from "../Primitives";

export const STEPS = [
  { id: 1, label: "Account" },
  { id: 2, label: "Verify email" },
  { id: 3, label: "Vouches" },
  { id: 4, label: "Guidelines" },
] as const;

interface SignupStepsProps {
  currentStep: number;
  tone?: "light" | "dark";
  showLabel?: boolean;
  totalSteps: number;
}

export function SignupSteps({
  currentStep,
  tone = "light",
  showLabel = true,
  totalSteps,
}: SignupStepsProps) {
  const visibleSteps = STEPS.slice(0, totalSteps);

  const steps =
    totalSteps === 3
      ? [
          STEPS[0],
          STEPS[1],
          {
            id: 3,
            label: "Guidelines",
          },
        ]
      : visibleSteps;

  const current = steps.find((step) => step.id === currentStep) ?? steps[0];

  return (
    <nav aria-label="Signup progress">
      {showLabel && (
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <p
            className={cn(
              "text-[13.5px] font-medium",
              tone === "dark" ? "text-panel-fg" : "text-ink",
            )}
          >
            {current.label}
          </p>

          <p
            className={cn(
              "text-[13px] tabular-nums",
              tone === "dark" ? "text-panel-faint" : "text-faint",
            )}
          >
            Step {currentStep} of {totalSteps}
          </p>
        </div>
      )}

      <ol className="flex gap-1.5">
        {steps.map((step) => {
          const reached = step.id <= currentStep;

          return (
            <li
              key={step.id}
              className={cn(
                "h-0.75 flex-1 rounded-full transition-colors duration-500 ease-out",
                reached
                  ? "bg-brand"
                  : tone === "dark"
                    ? "bg-panel-line"
                    : "bg-line-strong",
              )}
            >
              <span className="sr-only">
                {step.label}

                {step.id < currentStep
                  ? " — completed"
                  : step.id === currentStep
                    ? " — current step"
                    : ""}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
