import FeedbackForm from "./ui/FeedbackForm";

export default function FeedbackPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-semibold text-ink">Give feedback</h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          Help us improve DrukConnect by reporting bugs or sharing suggestions.
        </p>
      </div>

      <FeedbackForm />
    </main>
  );
}
