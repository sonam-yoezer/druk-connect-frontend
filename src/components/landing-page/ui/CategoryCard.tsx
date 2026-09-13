import { Category } from "../types/landing";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      className="flex h-full min-h-40 w-full flex-col rounded-lg border border-line bg-surface p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-brand-line hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-tint">
        <Icon className="h-5 w-5 text-brand" />
      </div>

      <span className="mt-auto block pt-6 text-sm font-semibold text-ink">
        {category.title}
      </span>
    </button>
  );
}
