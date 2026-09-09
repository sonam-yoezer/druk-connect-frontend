"use client";

import { useState } from "react";
import { useEmailVerification } from "./hooks/useEmailVerification";
import { useSignup } from "./hooks/useSignUp";
import { AccountDetails } from "./ui/sign-up/AccountDetails";
import { AgreeFinish } from "./ui/sign-up/AgreeFinish";
import { AuthHeader } from "./ui/sign-up/AuthHeader";
import { BrandPanel } from "./ui/sign-up/BrandPanel";
import { EmailVerification } from "./ui/sign-up/EmailVerification";
import { MemberVouch } from "./ui/sign-up/MemberVouch";

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
const INITIAL_USER_ID = null;

export default function SignupPage() {
  const [step, setStep] = useState(INITIAL_STEP);
  const [userId, setUserId] = useState<string | null>(INITIAL_USER_ID);
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

  const goToNextStep = () => {
    setStep((currentStep) => Math.min(currentStep + 1, 4));
  };

  const goToPreviousStep = () => {
    setStep((currentStep) => Math.max(currentStep - 1, 1));
  };

  const handleAccountDetails = (data: SignupData) => {
    // Clear previous backend errors
    setServerErrors({});

    setSignupData(data);

    signup(
      {
        ...data,
        accessType: "LISTER",
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

  return (
    <main className="min-h-screen bg-background text-ink lg:flex">
      <BrandPanel
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
              {step === 1 && (
                <AccountDetails
                  onNext={handleAccountDetails}
                  isLoading={isSigningUp}
                  serverErrors={serverErrors}
                />
              )}

              {step === 2 && (
                <EmailVerification
                  email={signupData.email}
                  onNext={handleVerifyEmail}
                  isLoading={isVerifyingOtp}
                  error={verificationError}
                />
              )}

              {step === 3 && (
                <MemberVouch userId={userId} onNext={goToNextStep} />
              )}

              {step === 4 && <AgreeFinish />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
