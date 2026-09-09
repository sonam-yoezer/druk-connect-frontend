"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  StepHeading,
  Label,
  TextInput,
  Hint,
  FieldError,
  cn,
  inputBase,
  inputInvalid,
  inputRest,
  Button,
} from "../Primitives";

interface SignInFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  serverError?: string;
}

type Field = "email" | "password";

export function SignInForm({
  onSubmit,
  isLoading = false,
  serverError,
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const updateField = (field: Field, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<Field, string>> = {};

    if (!form.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Enter your password.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);

      document
        .querySelector<HTMLInputElement>("[aria-invalid='true']")
        ?.focus();

      return;
    }

    onSubmit({
      email: form.email.trim().toLowerCase(),
      password: form.password,
    });
  };

  return (
    <div className="animate-step">
      <StepHeading
        title="Welcome back"
        description="Sign in to your DrukConnect account and get back to the community."
      />

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-4">
        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>

          <TextInput
            id="email"
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-invalid={Boolean(errors.email)}
          />

          <Hint>Use the email address you registered with.</Hint>

          <FieldError>{errors.email}</FieldError>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="/forgot-password"
              className="text-[12.5px] font-medium text-ink underline decoration-line-strong underline-offset-[3px] transition hover:decoration-ink"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password) || undefined}
              className={cn(
                inputBase,
                "h-11 pr-11",
                errors.password ? inputInvalid : inputRest,
              )}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-faint transition hover:bg-background hover:text-ink"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4.25 w-4.25" strokeWidth={1.8} />
              ) : (
                <Eye className="h-4.25 w-4.25" strokeWidth={1.8} />
              )}
            </button>
          </div>

          <FieldError>{errors.password}</FieldError>
        </div>

        {/* Server error */}
        {serverError && (
          <div className="rounded-[10px] border border-danger/20 bg-danger-tint px-3.5 py-3 text-[13px] leading-5 text-danger">
            {serverError}
          </div>
        )}

        {/* Submit */}
        <div className="pt-3">
          <Button type="submit" fullWidth loading={isLoading}>
            {isLoading ? "Signing in" : "Sign in"}
          </Button>

          <p className="mt-5 text-center text-[13.5px] text-faint">
            New to DrukConnect?{" "}
            <Link
              href="/signup"
              className="font-medium text-ink underline decoration-line-strong underline-offset-[3px] transition hover:decoration-ink"
            >
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
