import Link from "next/link";

import { ListingCard } from "./listing-card";
import { listings } from "../types/landing";

export function RecentListings() {
  return (
    <section className="py-14">
      <div className="wrap">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-serif text-[30px] font-medium leading-[1.1]">
              Recently posted
            </h2>

            <p className="mt-1.5 text-[15px] text-slate">
              New listings from across the community, most recent first.
            </p>
          </div>

          <Link
            href="/services"
            className="hidden border-b-[1.5px] border-maroon pb-0.5 text-sm font-semibold text-maroon sm:block"
          >
            View all listings
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-6 max-[900px]:grid-cols-2 max-[640px]:grid-cols-1">
          {listings.map((listing) => (
            <ListingCard key={listing.title} listing={listing} />
          ))}
        </div>

        <div className="mt-5 sm:hidden">
          <Link
            href="/services"
            className="border-b-[1.5px] border-maroon pb-0.5 text-sm font-semibold text-maroon"
          >
            View all listings
          </Link>
        </div>
      </div>
    </section>
  );
}
