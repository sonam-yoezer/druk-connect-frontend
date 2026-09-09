"use client";

import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";

export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

/* ── Brand mark ───────────────────────────────────────────── */

export function BrandMark({
  size = 24,
  onDark = false,
}: {
  size?: number;
  onDark?: boolean;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <rect
        width="24"
        height="24"
        rx="7.5"
        className={onDark ? "fill-panel-fg" : "fill-brand"}
      />

      <path
        d="M5.5 16.4 9.8 9.2l2.7 4.5 1.8-2.8 4.2 5.5H5.5Z"
        className={onDark ? "fill-panel" : "fill-white"}
      />

      <circle
        cx="15.9"
        cy="7.5"
        r="2"
        className={onDark ? "fill-brand" : "fill-white"}
        fillOpacity={onDark ? 1 : 0.6}
      />
    </svg>
  );
}

/* ── Step chrome ──────────────────────────────────────────── */

export function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="-ml-2 mb-6 inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13.5px] text-faint transition hover:bg-surface hover:text-ink"
    >
      <ArrowLeft className="h-3.75 w-3.75" strokeWidth={2} />
      Back
    </button>
  );
}

export function StepHeading({
  title,
  description,
}: {
  title: string;
  description: ReactNode;
}) {
  return (
    <header className="mb-8">
      <h1 className="font-serif text-[29px] font-normal leading-[1.14] tracking-[-0.02em] text-ink sm:text-[32px]">
        {title}
      </h1>

      <p className="mt-3 max-w-[44ch] text-[14.5px] leading-6 text-muted">
        {description}
      </p>
    </header>
  );
}

/* ── Field parts ──────────────────────────────────────────── */

export function Label({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor?: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-[13.5px] font-medium text-ink"
    >
      {children}
      {optional && <span className="font-normal text-faint"> — optional</span>}
    </label>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1.5 text-[12.5px] leading-5 text-faint">{children}</p>
  );
}

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null;

  return (
    <p role="alert" className="mt-1.5 text-[12.5px] leading-5 text-danger">
      {children}
    </p>
  );
}

export const inputBase =
  "w-full rounded-[10px] border bg-surface px-3.5 text-[15px] text-ink outline-none transition placeholder:text-faint/75";

export const inputRest =
  "border-line hover:border-line-strong focus:border-brand focus:ring-[3.5px] focus:ring-brand/15";

export const inputInvalid =
  "border-danger bg-danger-tint focus:border-danger focus:ring-[3.5px] focus:ring-danger/15";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ invalid = false, className, ...props }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(
          inputBase,
          "h-11",
          invalid ? inputInvalid : inputRest,
          className,
        )}
        {...props}
      />
    );
  },
);

/* ── Buttons ──────────────────────────────────────────────── */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "quiet";
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  variant = "primary",
  loading = false,
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-brand text-white shadow-[0_1px_2px_rgba(75,69,209,0.3)] hover:bg-brand-dark active:scale-[0.995]",
    secondary:
      "border border-line-strong bg-surface text-ink hover:border-ink/25 hover:bg-background",
    quiet: "text-faint hover:text-ink",
  }[variant];

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-[10px] px-5 text-[14.5px] font-medium transition disabled:cursor-not-allowed disabled:opacity-55",
        fullWidth && "w-full",
        styles,
        className,
      )}
      {...props}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-3.75 w-3.75 shrink-0 animate-spin rounded-full border-[1.8px] border-current/35 border-t-current"
        />
      )}

      {children}
    </button>
  );
}

/* ── Avatar ───────────────────────────────────────────────── */

export function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Avatar({
  name,
  tone = "brand",
  size = 34,
}: {
  name: string;
  tone?: "brand" | "jade" | "ink";
  size?: number;
}) {
  const tones = {
    brand: "bg-brand-tint text-brand",
    jade: "bg-jade-tint text-jade",
    ink: "bg-ink/[0.07] text-muted",
  }[tone];

  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.36 }}
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold",
        tones,
      )}
    >
      {initialsOf(name) || "?"}
    </span>
  );
}
