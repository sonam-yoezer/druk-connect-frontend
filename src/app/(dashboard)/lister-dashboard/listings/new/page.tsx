import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewListingPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-8">
      <header>
        <Link
          href="/lister-dashboard/listings"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
            My listings
          </p>

          <h1 className="mt-2 font-serif text-3xl font-medium tracking-tight text-ink">
            Create a listing
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted">
            Add your service so people in the Bhutanese community can find and
            contact you.
          </p>
        </div>
      </header>

      <form className="border border-line bg-surface">
        <div className="divide-y divide-line">
          <section className="p-6 sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">
                Basic information
              </h2>

              <p className="mt-1 text-sm text-muted">
                Tell people what service you provide.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <Field
                label="Service title"
                name="title"
                placeholder="e.g. Bhutanese Catering"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Category"
                  name="category"
                  options={[
                    "Food",
                    "Transport",
                    "Home",
                    "Tutoring",
                    "Beauty",
                    "Repairs",
                    "Jobs",
                  ]}
                />

                <SelectField
                  label="City"
                  name="city"
                  options={[
                    "Melbourne",
                    "Sydney",
                    "Brisbane",
                    "Adelaide",
                    "Perth",
                    "Canberra",
                  ]}
                />
              </div>

              <TextAreaField
                label="Description"
                name="description"
                placeholder="Describe your service, what you offer, and anything customers should know."
              />
            </div>
          </section>

          <section className="p-6 sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">Pricing</h2>

              <p className="mt-1 text-sm text-muted">
                Give customers a clear idea of what your service costs.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                label="Price"
                name="price"
                type="number"
                placeholder="25"
              />

              <SelectField
                label="Price unit"
                name="priceUnit"
                options={[
                  "per hour",
                  "per person",
                  "per trip",
                  "per session",
                  "per job",
                  "Starting from",
                ]}
              />
            </div>
          </section>

          <section className="p-6 sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">Listing image</h2>

              <p className="mt-1 text-sm text-muted">
                Add a clear photo that represents your service.
              </p>
            </div>

            <label className="mt-6 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-line-strong bg-background px-6 text-center transition-colors hover:border-brand hover:bg-brand-tint">
              <span className="text-sm font-semibold text-ink">
                Upload an image
              </span>

              <span className="mt-1 text-xs text-muted">
                PNG or JPG up to 5MB
              </span>

              <input
                type="file"
                name="image"
                accept="image/png,image/jpeg"
                className="sr-only"
              />
            </label>
          </section>

          <div className="flex flex-col-reverse gap-3 bg-background p-6 sm:flex-row sm:items-center sm:justify-end sm:p-8">
            <Link
              href="/lister-dashboard/listings"
              className="inline-flex h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Create listing
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 h-11 w-full rounded-md border border-line bg-background px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
      </label>

      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 h-11 w-full rounded-md border border-line bg-background px-3.5 text-sm text-ink outline-none transition-colors focus:border-brand"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
      </label>

      <textarea
        id={name}
        name={name}
        rows={5}
        placeholder={placeholder}
        className="mt-2 w-full resize-none rounded-md border border-line bg-background px-3.5 py-3 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
      />
    </div>
  );
}
