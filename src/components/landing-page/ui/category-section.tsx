import Link from "next/link";

import { CategoryCard } from "./category-card";
import { categories } from "../types/landing";

export function CategorySection() {
  return (
    <section className="py-14">
      <div className="wrap">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[30px] font-medium leading-[1.1]">
              What are you looking for?
            </h2>

            <p className="mt-1.5 text-[15px] text-slate">
              Browse by category, or post your own service in under two minutes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3.5 max-[860px]:grid-cols-3 max-[520px]:grid-cols-2">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>

        <div className="mt-5 sm:hidden">
          <Link
            href="/services"
            className="border-b-[1.5px] border-maroon pb-0.5 text-sm font-semibold text-maroon"
          >
            View all services
          </Link>
        </div>
      </div>
    </section>
  );
}
