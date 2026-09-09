"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "../auth/store/authStore";

export default function DashboardPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const clearSession = useAuthStore((state) => state.clearSession);

  const handleLogout = () => {
    clearSession();
    router.push("/signin");
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-ink">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between border-b border-line pb-5">
          <div>
            <p className="font-serif text-2xl font-medium">DrukConnect</p>
            <p className="mt-1 text-sm text-faint">Dashboard</p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-line px-4 py-2 text-sm font-medium transition hover:bg-surface"
          >
            Sign out
          </button>
        </div>

        <section className="mt-10">
          <p className="text-sm text-faint">Welcome back</p>

          <h1 className="mt-1 font-serif text-3xl font-medium">
            {user ? `${user.firstName} ${user.lastName}` : "Member"}
          </h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-sm text-faint">Listings</p>
              <p className="mt-2 text-2xl font-semibold">0</p>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-sm text-faint">Messages</p>
              <p className="mt-2 text-2xl font-semibold">0</p>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <p className="text-sm text-faint">Connections</p>
              <p className="mt-2 text-2xl font-semibold">0</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
