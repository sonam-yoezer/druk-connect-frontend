import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function LogoMark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2L25 22H3L14 2Z"
        className="stroke-brand"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path d="M14 10L19 19H9L14 10Z" className="fill-brand" />
    </svg>
  );
}

const FOOTER_LINKS = [
  {
    title: "Explore",
    links: [
      {
        href: "/services",
        label: "Browse services",
      },
      {
        href: "/auth/signup",
        label: "Post a service",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        href: "/how-it-works",
        label: "How it works",
      },
      {
        href: "/safety",
        label: "Safety tips",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        href: "/contact",
        label: "Contact us",
      },
      {
        href: "/report",
        label: "Report a listing",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer */}
        <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-serif text-xl font-semibold tracking-tight text-ink"
            >
              <LogoMark />
              DrukConnect
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-muted">
              A trusted marketplace connecting the Bhutanese community across
              Australia.
            </p>

            <Link
              href="/services"
              className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors duration-200 hover:text-brand"
            >
              Explore the community
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-8">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                  {section.title}
                </p>

                <div className="mt-5 flex flex-col gap-3.5">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors duration-200 hover:text-brand"
                    >
                      {link.label}

                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-line py-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>Made for the Bhutanese community in Australia.</p>

          <p>© {new Date().getFullYear()} DrukConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
