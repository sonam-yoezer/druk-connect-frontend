"use client";

import { useEffect, useRef, useState } from "react";
import { Button, StepHeading, cn } from "../Primitives";

const LENGTH = 4;
const RESEND_SECONDS = 42;

interface EmailVerificationProps {
  email: string;
  onNext: (otp: string) => void;
  isLoading?: boolean;
  error?: Error | null;
}

export function EmailVerification({
  email,
  onNext,
  isLoading = false,
  error,
}: EmailVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = window.setTimeout(
      () => setSecondsLeft((current) => current - 1),
      1000,
    );

    return () => window.clearTimeout(timer);
  }, [secondsLeft]);

  const isComplete = otp.every((digit) => digit !== "");

  const focusAt = (index: number) => {
    inputs.current[Math.min(Math.max(index, 0), LENGTH - 1)]?.focus();
  };

  const handleChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      setOtp((current) => {
        const next = [...current];
        next[index] = "";
        return next;
      });

      return;
    }

    setOtp((current) => {
      const next = [...current];

      digits.split("").forEach((digit, offset) => {
        if (index + offset < LENGTH) next[index + offset] = digit;
      });

      return next;
    });

    focusAt(index + digits.length);
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      event.preventDefault();
      focusAt(index - 1);

      setOtp((current) => {
        const next = [...current];
        next[index - 1] = "";
        return next;
      });
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusAt(index - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusAt(index + 1);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = otp.join("");

    if (code.length !== LENGTH) return;

    onNext(code);
  };

  return (
    <div className="animate-step">
      <StepHeading
        title="Check your inbox"
        description={
          <>
            We sent a 4-digit code to{" "}
            <span className="font-medium text-ink">{email}</span>. It expires in
            ten minutes.
          </>
        }
      />

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className="mb-2 text-[13.5px] font-medium text-ink">
            Verification code
          </legend>

          <div className="flex gap-2.5">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                autoComplete={index === 0 ? "one-time-code" : "off"}
                maxLength={LENGTH}
                value={digit}
                disabled={isLoading}
                aria-label={`Digit ${index + 1}`}
                aria-invalid={Boolean(error) || undefined}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onFocus={(event) => event.target.select()}
                className={cn(
                  "h-15.5 w-full min-w-0 rounded-xl border text-center font-serif text-[25px] text-ink outline-none transition",
                  "disabled:cursor-not-allowed disabled:opacity-60",
                  error
                    ? "border-danger bg-danger-tint focus:ring-[3.5px] focus:ring-danger/15"
                    : "border-line bg-surface hover:border-line-strong focus:border-brand focus:ring-[3.5px] focus:ring-brand/15",
                )}
              />
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="mt-3 text-[13px] leading-5 text-danger">
            {error.message}
          </p>
        )}

        <div className="mt-7">
          <Button
            type="submit"
            fullWidth
            disabled={!isComplete}
            loading={isLoading}
          >
            {isLoading ? "Verifying" : "Verify and continue"}
          </Button>
        </div>

        <p className="mt-5 text-center text-[13px] text-faint">
          {secondsLeft > 0 ? (
            <>
              Didn&apos;t get it? You can resend in{" "}
              <span className="tabular-nums text-muted">
                0:{String(secondsLeft).padStart(2, "0")}
              </span>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setSecondsLeft(RESEND_SECONDS)}
              className="font-medium text-brand underline decoration-brand-line underline-offset-[3px] transition hover:decoration-brand"
            >
              Resend the code
            </button>
          )}
        </p>
      </form>
    </div>
  );
}
