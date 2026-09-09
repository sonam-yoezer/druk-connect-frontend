import { Category } from "../types/landing";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = category.icon;

  return (
    <button
      type="button"
      className="rounded border border-line bg-paper-raised p-5 text-left transition-colors hover:border-maroon"
    >
      <Icon className="mb-3.5 h-[26px] w-[26px] text-maroon" />

      <span className="block text-sm font-semibold">{category.title}</span>
    </button>
  );
}
