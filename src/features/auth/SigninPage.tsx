"use client";

import { useVouchRecoveryStore } from "./store/vouchRecoveryStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SignInForm } from "./ui/sign-in/SignInForm";
import { SignInBrandPanel } from "./ui/sign-in/SignInBrandPanel";
import { useLogin } from "./hooks/useLogin";
import { useAuthStore } from "./store/authStore";
import { getDashboardRoute } from "@/src/shared/routes/getDashboardRoute";

export default function SignInPage() {
  const router = useRouter();

  const completionNotice = useVouchRecoveryStore((state) => state.completionNotice);

  const [serverError, setServerError] = useState("");

  const { mutate: login, isPending } = useLogin();

  const setSession = useAuthStore((state) => state.setSession);

  const handleSignIn = (data: { email: string; password: string }) => {
    setServerError("");
    useVouchRecoveryStore.getState().dismissCompletionNotice();

    login(
      {
        identifier: data.email,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          if (response.loginStatus === "VOUCH_REQUIRED") {
            useAuthStore.getState().clearSession();
            useVouchRecoveryStore.getState().start(response);
            setServerError(response.message);
            return;
          }
          if (response.loginStatus !== "AUTHENTICATED" || !response.tokens?.accessToken || !response.tokens?.refreshToken) {
            useAuthStore.getState().clearSession();
            setServerError("Unable to sign in: invalid login response.");
            return;
          }
          useVouchRecoveryStore.getState().clear();
          setSession(response.tokens);

          router.push(getDashboardRoute(response.tokens.user));
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
              {completionNotice && (
                <p role="status" className="mb-6 rounded-lg bg-brand-tint p-4 text-brand">
                  You have now met the minimum required vouches. Please sign in to restore full access.
                </p>
              )}
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
