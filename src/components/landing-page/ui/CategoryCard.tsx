import { Category } from "../types/landing";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      className="flex h-full min-h-40 w-full flex-col rounded-md border border-line bg-surface p-5 text-left transition-colors duration-200 hover:border-brand-line"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-tint">
        <Icon className="h-5 w-5 text-brand" />
      </div>

      <div className="mt-5 flex min-h-10 items-start">
        <span className="text-sm font-semibold leading-5 text-ink">
          {category.title}
        </span>
      </div>
    </button>
  );
}
