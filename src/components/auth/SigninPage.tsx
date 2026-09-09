"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SignInForm } from "./ui/sign-in/SignInForm";
import { SignInBrandPanel } from "./ui/sign-in/SignInBrandPanel";
import { useLogin } from "./hooks/useLogin";
import { useAuthStore } from "./store/authStore";

export default function SignInPage() {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const { mutate: login, isPending } = useLogin();

  const setSession = useAuthStore((state) => state.setSession);

  const handleSignIn = (data: { email: string; password: string }) => {
    setServerError("");

    login(
      {
        identifier: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          setSession(response.user, response.accessToken);

          router.push("/dashboard");
        },

        onError: (error) => {
          setServerError(
            error.message || "Unable to sign in. Please try again.",
          );
        },
      },
    );
  };

  return (
    <main className="min-h-screen bg-background text-ink lg:flex">
      <SignInBrandPanel />

      <section className="flex min-h-screen min-w-0 flex-1 flex-col lg:ml-[41%]">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex min-h-full justify-center px-6 pb-16 pt-8 sm:px-10 lg:px-12 lg:py-12">
            <div className="w-full max-w-110 lg:my-auto">
              <SignInForm
                onSubmit={handleSignIn}
                isLoading={isPending}
                serverError={serverError}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
