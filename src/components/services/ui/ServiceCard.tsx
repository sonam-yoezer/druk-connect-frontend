import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

type Service = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  price: string;
  priceUnit: string;
  image: string;
};

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface transition-colors duration-200 hover:border-brand-line"
    >
      {/* Image */}
      <div className="relative h-[220px] shrink-0 overflow-hidden bg-brand-tint">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <span className="absolute left-4 top-4 rounded-md bg-surface/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-ink shadow-sm">
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div>
          <h3 className="font-serif text-xl font-medium leading-tight tracking-tight text-ink">
            {service.title}
          </h3>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-faint" />
            <span>{service.location}</span>
          </div>

          <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
            {service.description}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <div>
            <span className="text-lg font-semibold tracking-tight text-ink">
              {service.price}
            </span>

            <span className="ml-1 text-xs text-muted">{service.priceUnit}</span>
          </div>

          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line-strong text-ink transition-colors group-hover:border-brand group-hover:text-brand"
            aria-hidden="true"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
