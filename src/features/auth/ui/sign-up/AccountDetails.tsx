"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import { accountDetailsSchema } from "../../schemas/accountDetailsSchema";

import {
  StepHeading,
  Label,
  TextInput,
  FieldError,
  Hint,
  cn,
  inputBase,
  inputInvalid,
  inputRest,
  Button,
} from "../Primitives";

interface AccountDetailsProps {
  onNext: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;

    /*
     * Only included when signup came
     * from a vouch invitation.
     */
    vouchInvitationToken?: string;
  }) => void;

  isLoading?: boolean;

  serverErrors?: Partial<
    Record<Field, string>
  >;
}

type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "password";

export function AccountDetails({
  onNext,
  isLoading = false,
  serverErrors,
}: AccountDetailsProps) {

  const searchParams =
    useSearchParams();

  /*
   * Example:
   *
   * /auth/signup?token=abc123
   */
  const invitationToken =
    searchParams.get("token");

  const [showPassword, setShowPassword] =
    useState(false);

  const [errors, setErrors] =
    useState<
      Partial<Record<Field, string>>
    >({});

  const [form, setForm] =
    useState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    });

  const updateField = (
    field: Field,
    value: string,
  ) => {

    setForm(
      (current) => ({
        ...current,
        [field]: value,
      }),
    );

    setErrors(
      (current) => ({
        ...current,
        [field]: undefined,
      }),
    );
  };

  const strength =
    useMemo(
      () =>
        scorePassword(
          form.password,
        ),
      [form.password],
    );

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {

    event.preventDefault();

    const result =
      accountDetailsSchema.safeParse(
        form,
      );

    if (!result.success) {

      const nextErrors:
        Partial<Record<Field, string>> =
        {};

      for (
        const issue of
        result.error.issues
      ) {

        const field =
          issue.path[0] as Field;

        if (!nextErrors[field]) {
          nextErrors[field] =
            issue.message;
        }
      }

      setErrors(
        nextErrors,
      );

      document
        .querySelector<HTMLInputElement>(
          "[aria-invalid='true']",
        )
        ?.focus();

      return;
    }

    /*
     * =========================================================
     * NORMALIZE AUSTRALIAN MOBILE NUMBER
     * =========================================================
     *
     * User may enter:
     *
     * 412345678
     *
     * or:
     *
     * 0412345678
     *
     * Backend receives:
     *
     * +61412345678
     */
    let phone =
      result.data.phoneNumber.replace(
        /\D/g,
        "",
      );

    /*
     * Remove Australian leading 0.
     */
    if (
      phone.startsWith("04")
    ) {

      phone =
        phone.substring(1);
    }

    const phoneNumber =
      `+61${phone}`;

    /*
     * =========================================================
     * BUILD ACCOUNT DETAILS
     * =========================================================
     */
    const accountData = {

      firstName:
        result.data.firstName,

      lastName:
        result.data.lastName,

      email:
        result.data.email
          .trim()
          .toLowerCase(),

      phoneNumber,

      password:
        result.data.password,

      /*
       * Only add invitation token
       * when it exists in URL.
       */
      ...(invitationToken
        ? {
            vouchInvitationToken:
              invitationToken,
          }
        : {}),
    };

    onNext(
      accountData,
    );
  };

  return (
    <div className="animate-step">

      <StepHeading
        title="Join DrukConnect"
        description="One account for the whole community — buying, renting, hiring and gathering across Australia."
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-4"
      >

        <div className="grid gap-4 sm:grid-cols-2">

          <div>

            <Label htmlFor="firstName">
              First name
            </Label>

            <TextInput
              id="firstName"
              type="text"
              value={
                form.firstName
              }
              onChange={
                (event) =>
                  updateField(
                    "firstName",
                    event.target.value,
                  )
              }
              placeholder="Tashi"
              autoComplete="given-name"
              invalid={
                Boolean(
                  errors.firstName ||
                  serverErrors?.firstName,
                )
              }
            />

            <FieldError>
              {errors.firstName ||
                serverErrors?.firstName}
            </FieldError>

          </div>

          <div>

            <Label htmlFor="lastName">
              Last name
            </Label>

            <TextInput
              id="lastName"
              type="text"
              value={
                form.lastName
              }
              onChange={
                (event) =>
                  updateField(
                    "lastName",
                    event.target.value,
                  )
              }
              placeholder="Dorji"
              autoComplete="family-name"
              invalid={
                Boolean(
                  errors.lastName ||
                  serverErrors?.lastName,
                )
              }
            />

            <FieldError>
              {errors.lastName ||
                serverErrors?.lastName}
            </FieldError>

          </div>

        </div>

        <div>

          <Label htmlFor="email">
            Email
          </Label>

          <TextInput
            id="email"
            type="email"
            value={
              form.email
            }
            onChange={
              (event) =>
                updateField(
                  "email",
                  event.target.value,
                )
            }
            placeholder="you@example.com"
            autoComplete="email"
            invalid={
              Boolean(
                errors.email ||
                serverErrors?.email,
              )
            }
          />

          <Hint>
            We&apos;ll send a
            4-digit code here to
            confirm it&apos;s you.
          </Hint>

          <FieldError>
            {errors.email ||
              serverErrors?.email}
          </FieldError>

        </div>

        <div>

          <Label htmlFor="phoneNumber">
            Mobile number
          </Label>

          <div
            className={cn(
              "flex h-11 items-stretch overflow-hidden rounded-[10px] border transition",

              errors.phoneNumber ||
                serverErrors?.phoneNumber
                ? "border-danger bg-danger-tint focus-within:ring-[3.5px] focus-within:ring-danger/15"
                : "border-line bg-surface hover:border-line-strong focus-within:border-brand focus-within:ring-[3.5px] focus-within:ring-brand/15",
            )}
          >

            <span className="flex items-center border-r border-line px-3 text-[14.5px] tabular-nums text-muted">
              +61
            </span>

            <input
              id="phoneNumber"
              type="tel"
              inputMode="numeric"
              value={
                form.phoneNumber
              }
              onChange={
                (event) =>
                  updateField(
                    "phoneNumber",
                    event.target.value,
                  )
              }
              placeholder="412 345 678"
              autoComplete="tel-national"
              aria-invalid={
                Boolean(
                  errors.phoneNumber ||
                  serverErrors?.phoneNumber,
                ) || undefined
              }
              className="min-w-0 flex-1 bg-transparent px-3.5 text-[15px] text-ink outline-none placeholder:text-faint/75"
            />

          </div>

          <Hint>
            Enter an Australian
            mobile number, for example
            412 345 678.
          </Hint>

          <FieldError>
            {errors.phoneNumber ||
              serverErrors?.phoneNumber}
          </FieldError>

        </div>

        <div>

          <Label htmlFor="password">
            Password
          </Label>

          <div className="relative">

            <input
              id="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              value={
                form.password
              }
              onChange={
                (event) =>
                  updateField(
                    "password",
                    event.target.value,
                  )
              }
              placeholder="Create a password"
              autoComplete="new-password"
              aria-invalid={
                Boolean(
                  errors.password ||
                  serverErrors?.password,
                ) || undefined
              }
              className={cn(
                inputBase,
                "h-11 pr-11",

                errors.password ||
                  serverErrors?.password
                  ? inputInvalid
                  : inputRest,
              )}
            />

            <button
              type="button"
              onClick={
                () =>
                  setShowPassword(
                    (current) =>
                      !current,
                  )
              }
              className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-faint transition hover:bg-background hover:text-ink"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >

              {showPassword ? (
                <EyeOff
                  className="h-4.25 w-4.25"
                  strokeWidth={1.8}
                />
              ) : (
                <Eye
                  className="h-4.25 w-4.25"
                  strokeWidth={1.8}
                />
              )}

            </button>

          </div>

          <div className="mt-2 flex items-center gap-2.5">

            <span
              className="flex w-19 shrink-0 gap-1"
              aria-hidden="true"
            >

              {[0, 1, 2].map(
                (index) => (
                  <span
                    key={
                      index
                    }
                    className={cn(
                      "h-0.75 flex-1 rounded-full transition-colors duration-300",

                      index <
                      strength.score
                        ? strength.color
                        : "bg-line-strong",
                    )}
                  />
                ),
              )}

            </span>

            <span className="text-[12.5px] text-faint">
              {strength.label}
            </span>

          </div>

          <FieldError>
            {errors.password ||
              serverErrors?.password}
          </FieldError>

        </div>

        <div className="pt-3">

          <Button
            type="submit"
            fullWidth
            loading={
              isLoading
            }
          >
            {isLoading
              ? "Creating account"
              : "Continue"}
          </Button>

          <p className="mt-5 text-center text-[13.5px] text-faint">

            Already a member?{" "}

            <Link
              href="/signin"
              className="font-medium text-ink underline decoration-line-strong underline-offset-[3px] transition hover:decoration-ink"
            >
              Sign in
            </Link>

          </p>

        </div>

      </form>

    </div>
  );
}

function scorePassword(
  value: string,
) {

  if (!value.length) {

    return {
      score: 0,
      label: "At least 10 characters",
      color: "",
    };
  }

  if (value.length < 10) {

    return {
      score: 1,
      label: "Too short",
      color: "bg-danger",
    };
  }

  let score = 1;

  if (
    value.length >= 12 ||
    (
      /[a-z]/.test(value) &&
      /[A-Z]/.test(value)
    )
  ) {

    score += 1;
  }

  if (
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(
      value,
    )
  ) {

    score += 1;
  }

  if (score >= 3) {

    return {
      score: 3,
      label: "Strong",
      color: "bg-jade",
    };
  }

  if (score === 2) {

    return {
      score: 2,
      label: "Good",
      color: "bg-brand",
    };
  }

  return {
    score: 1,
    label:
      "Weak — add length or mixed case",
    color: "bg-danger",
  };
}