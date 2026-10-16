import AdminFeedbackList from "@/src/features/admin-dashboard/AdminFeedbackList";

export default function AdminFeedbackPage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-ink">User feedback</h1>
        <p className="mt-2 text-sm text-muted">
          View and review feedback submitted by buyers, listers, and other
          users.
        </p>
      </div>

      <AdminFeedbackList />
    </main>
  );
}
