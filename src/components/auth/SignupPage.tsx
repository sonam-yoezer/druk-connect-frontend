"use client";

import { useState } from "react";

import { useEmailVerification } from "./hooks/useEmailVerification";
import { useSignup } from "./hooks/useSignUp";

import { AccountDetails } from "./ui/sign-up/AccountDetails";
import { AgreeFinish } from "./ui/sign-up/AgreeFinish";
import { AuthHeader } from "./ui/sign-up/AuthHeader";
import { BrandPanel } from "./ui/sign-up/BrandPanel";
import { ChooseRole } from "./ui/sign-up/ChooseRole";
import { EmailVerification } from "./ui/sign-up/EmailVerification";
import { MemberVouch } from "./ui/sign-up/MemberVouch";

type SignupRole = "LISTER" | "BUYER";

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

type AccountField =
  | "firstName"
  | "lastName"
  | "email"
  | "phoneNumber"
  | "password";

const INITIAL_SIGNUP_DATA: SignupData = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  password: "",
};

const INITIAL_STEP = 1;

export default function SignupPage() {
  const [role, setRole] = useState<SignupRole | null>(null);

  const [step, setStep] = useState(INITIAL_STEP);

  const [userId, setUserId] = useState<string | null>(null);

  const [signupData, setSignupData] = useState<SignupData>(INITIAL_SIGNUP_DATA);

  const [serverErrors, setServerErrors] = useState<
    Partial<Record<AccountField, string>>
  >({});

  const { mutate: signup, isPending: isSigningUp } = useSignup();

  const {
    mutate: verifyOtp,
    isPending: isVerifyingOtp,
    error: verificationError,
  } = useEmailVerification();

  /**
   * Lister:
   * 1. Account Details
   * 2. Email Verification
   * 3. Member Vouch
   * 4. Agree & Finish
   *
   * Buyer:
   * 1. Account Details
   * 2. Email Verification
   * 3. Agree & Finish
   */
  const totalSteps = role === "LISTER" ? 4 : 3;

  const goToNextStep = () => {
    setStep((currentStep) => Math.min(currentStep + 1, totalSteps));
  };

  const goToPreviousStep = () => {
    setStep((currentStep) => Math.max(currentStep - 1, INITIAL_STEP));
  };

  const handleRoleSelect = (selectedRole: SignupRole) => {
    setRole(selectedRole);
    setStep(INITIAL_STEP);
    setUserId(null);
    setSignupData(INITIAL_SIGNUP_DATA);
    setServerErrors({});
  };

  const handleAccountDetails = (data: SignupData) => {
    /**
     * The role must be selected before account details
     * can be submitted.
     */
    if (!role) {
      return;
    }

    /**
     * Store the narrowed value locally.
     *
     * This prevents TypeScript from treating `role`
     * as `SignupRole | null` when building the request.
     */
    const accessType: SignupRole = role;

    setServerErrors({});
    setSignupData(data);

    signup(
      {
        ...data,
        accessType,
        communityGuidelinesAccepted: true,
      },
      {
        onSuccess: (response) => {
          setUserId(response.userId);
          goToNextStep();
        },

        onError: (error) => {
          if (error.code === "EMAIL_EXISTS") {
            setServerErrors({
              email: "An account already exists with this email address.",
            });

            return;
          }

          if (error.code === "PHONE_EXISTS") {
            setServerErrors({
              phoneNumber: "An account already exists with this mobile number.",
            });

            return;
          }
        },
      },
    );
  };

  const handleVerifyEmail = (otp: string) => {
    if (!userId) {
      return;
    }

    verifyOtp(
      {
        userId,
        channel: "EMAIL",
        otp,
      },
      {
        onSuccess: () => {
          goToNextStep();
        },
      },
    );
  };

  /**
   * Show role selection before the signup flow starts.
   */
  if (!role) {
    return (
      <main className="min-h-screen bg-background text-ink">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-12">
          <ChooseRole onSelect={handleRoleSelect} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-ink lg:flex">
      <BrandPanel
        role={role}
        step={step}
        firstName={signupData.firstName}
        lastName={signupData.lastName}
        email={signupData.email}
      />

      <section className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-[41%]">
        <AuthHeader step={step} />

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full justify-center px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:py-12">
            <div className="w-full max-w-110 lg:my-auto">
              {/* STEP 1 — Account Details */}
              {step === 1 && (
                <AccountDetails
                  onNext={handleAccountDetails}
                  isLoading={isSigningUp}
                  serverErrors={serverErrors}
                />
              )}

              {/* STEP 2 — Email Verification */}
              {step === 2 && userId && (
                <EmailVerification
                  email={signupData.email}
                  userId={userId}
                  onNext={handleVerifyEmail}
                  isLoading={isVerifyingOtp}
                  error={verificationError}
                />
              )}
              {/* STEP 3 — Lister Vouch */}
              {step === 3 && role === "LISTER" && (
                <MemberVouch userId={userId} onNext={goToNextStep} />
              )}

              {/* STEP 3 — Buyer Finish */}
              {step === 3 && role === "BUYER" && <AgreeFinish />}

              {/* STEP 4 — Lister Finish */}
              {step === 4 && role === "LISTER" && <AgreeFinish />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
