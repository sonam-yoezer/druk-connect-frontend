"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ImagePlus } from "lucide-react";

import { useCreateListing } from "../hooks/useCreateListing";

export default function NewListingPage() {
  const router = useRouter();

  const [images, setImages] = useState<File[]>([]);
  const [serverError, setServerError] = useState("");

  const { mutate: createListing, isPending } = useCreateListing();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError("");

    const formData = new FormData(event.currentTarget);

    const pricingType = formData.get("pricingType") as "PAID" | "FREE";

    const dietaryOptions = formData.getAll("dietaryOptions") as string[];

    const data = {
      listingTitle: formData.get("listingTitle") as string,
      listingCategory: formData.get("listingCategory") as string,
      city: formData.get("city") as string,
      description: formData.get("description") as string,
      cuisine: formData.get("cuisine") as string,
      serviceType: formData.get("serviceType") as string,
      minimumOrder: Number(formData.get("minimumOrder")),
      serves: Number(formData.get("serves")),
      dietaryOptions,
      availability: formData.get("availability") as
        | "BOTH"
        | "WEEKDAYS"
        | "WEEKENDS",
      pricingType,
      rateAmount:
        pricingType === "PAID" ? Number(formData.get("rateAmount")) : null,
    };

    createListing(
      {
        data,
        images,
      },
      {
        onSuccess: () => {
          router.push("/lister-dashboard/listings");
        },
        onError: (error) => {
          setServerError(
            error.message || "Unable to create listing. Please try again.",
          );
        },
      },
    );
  };

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

      <form onSubmit={handleSubmit} className="border border-line bg-surface">
        <div className="divide-y divide-line">
          {/* Basic information */}
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
                name="listingTitle"
                placeholder="e.g. Authentic Bhutanese Home Cooking"
                required
              />

              <SelectField
                label="Listing category"
                name="listingCategory"
                options={[
                  "Food & Catering",
                  "Education",
                  "Transport",
                  "Home Services",
                  "Beauty & Wellness",
                  "Professional Services",
                  "Other",
                ]}
                required
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Cuisine"
                  name="cuisine"
                  options={[
                    "Bhutanese",
                    "Indian",
                    "Nepali",
                    "Tibetan",
                    "Asian",
                    "Other",
                  ]}
                  required
                />

                <SelectField
                  label="Service type"
                  name="serviceType"
                  options={[
                    "Home Catering",
                    "Community Meal",
                    "Restaurant",
                    "Meal Preparation",
                    "Food Delivery",
                    "Other",
                  ]}
                  required
                />
              </div>

              <SelectField
                label="City"
                name="city"
                options={[
                  "Sydney",
                  "Melbourne",
                  "Brisbane",
                  "Adelaide",
                  "Perth",
                  "Canberra",
                  "Hobart",
                  "Darwin",
                ]}
                required
              />

              <TextAreaField
                label="Description"
                name="description"
                placeholder="Describe your service, what you offer, and anything customers should know."
                required
              />
            </div>
          </section>

          {/* Service details */}
          <section className="p-6 sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">
                Service details
              </h2>

              <p className="mt-1 text-sm text-muted">
                Help customers understand how your service works.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Minimum order"
                  name="minimumOrder"
                  type="number"
                  min="1"
                  placeholder="2"
                  required
                />

                <Field
                  label="Serves"
                  name="serves"
                  type="number"
                  min="1"
                  placeholder="4"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-ink">
                  Dietary options
                </label>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <CheckboxField
                    name="dietaryOptions"
                    value="Vegetarian"
                    label="Vegetarian"
                  />

                  <CheckboxField
                    name="dietaryOptions"
                    value="Halal"
                    label="Halal"
                  />

                  <CheckboxField
                    name="dietaryOptions"
                    value="Vegan"
                    label="Vegan"
                  />

                  <CheckboxField
                    name="dietaryOptions"
                    value="Gluten Free"
                    label="Gluten Free"
                  />
                </div>
              </div>

              <SelectField
                label="Availability"
                name="availability"
                options={["BOTH", "WEEKDAYS", "WEEKENDS"]}
                optionLabels={{
                  BOTH: "Weekdays & weekends",
                  WEEKDAYS: "Weekdays",
                  WEEKENDS: "Weekends",
                }}
                required
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="p-6 sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">Pricing</h2>

              <p className="mt-1 text-sm text-muted">
                Tell customers whether your service is paid or free.
              </p>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <label className="text-sm font-semibold text-ink">
                  Pricing type
                </label>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-background p-4 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-tint">
                    <input
                      type="radio"
                      name="pricingType"
                      value="PAID"
                      defaultChecked
                      className="mt-0.5 h-4 w-4 accent-brand"
                    />

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Paid service
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        Customers pay for this service.
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-line bg-background p-4 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand-tint">
                    <input
                      type="radio"
                      name="pricingType"
                      value="FREE"
                      className="mt-0.5 h-4 w-4 accent-brand"
                    />

                    <div>
                      <p className="text-sm font-semibold text-ink">
                        Free service
                      </p>

                      <p className="mt-1 text-xs leading-5 text-muted">
                        This service is provided for free.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <Field
                label="Rate amount"
                name="rateAmount"
                type="number"
                min="0"
                step="0.01"
                placeholder="35.00"
              />

              <p className="text-xs leading-5 text-muted">
                Leave this empty for free services. The amount is sent as the
                service rate.
              </p>
            </div>
          </section>

          {/* Images */}
          <section className="p-6 sm:p-8">
            <div>
              <h2 className="text-sm font-semibold text-ink">Listing images</h2>

              <p className="mt-1 text-sm text-muted">
                Add clear photos that represent your service.
              </p>
            </div>

            <label className="mt-6 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-line-strong bg-background px-6 text-center transition-colors hover:border-brand hover:bg-brand-tint">
              <ImagePlus className="h-7 w-7 text-muted" />

              <span className="mt-3 text-sm font-semibold text-ink">
                {images.length > 0
                  ? `${images.length} image${images.length > 1 ? "s" : ""} selected`
                  : "Upload images"}
              </span>

              <span className="mt-1 text-xs text-muted">
                PNG or JPG up to 5MB each
              </span>

              <input
                type="file"
                name="images"
                accept="image/png,image/jpeg"
                multiple
                className="sr-only"
                onChange={(event) => {
                  setImages(Array.from(event.target.files ?? []));
                }}
              />
            </label>

            {images.length > 0 && (
              <div className="mt-4 space-y-2">
                {images.map((image) => (
                  <div
                    key={`${image.name}-${image.lastModified}`}
                    className="flex items-center justify-between rounded-md border border-line bg-background px-3 py-2"
                  >
                    <p className="truncate text-sm text-ink">{image.name}</p>

                    <p className="ml-4 shrink-0 text-xs text-muted">
                      {(image.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Error */}
          {serverError && (
            <div className="bg-red-50 px-6 py-4 sm:px-8">
              <p className="text-sm text-red-700">{serverError}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 bg-background p-6 sm:flex-row sm:items-center sm:justify-end sm:p-8">
            <Link
              href="/lister-dashboard/listings"
              className="inline-flex h-11 items-center justify-center rounded-md border border-line-strong px-5 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-ink"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-11 items-center justify-center rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Creating..." : "Create listing"}
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
  min,
  step,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  min?: string;
  step?: string;
  required?: boolean;
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
        min={min}
        step={step}
        placeholder={placeholder}
        required={required}
        className="mt-2 h-11 w-full rounded-md border border-line bg-background px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  optionLabels,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  optionLabels?: Record<string, string>;
  required?: boolean;
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
        required={required}
        className="mt-2 h-11 w-full rounded-md border border-line bg-background px-3.5 text-sm text-ink outline-none transition-colors focus:border-brand"
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabels?.[option] ?? option}
          </option>
        ))}
      </select>
    </div>
  );
}

function CheckboxField({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-md border border-line bg-background px-3.5 py-3 transition-colors hover:border-brand">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="h-4 w-4 rounded accent-brand"
      />

      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}

function TextAreaField({
  label,
  name,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
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
        required={required}
        className="mt-2 w-full resize-none rounded-md border border-line bg-background px-3.5 py-3 text-sm leading-6 text-ink outline-none transition-colors placeholder:text-faint focus:border-brand"
      />
    </div>
  );
}
