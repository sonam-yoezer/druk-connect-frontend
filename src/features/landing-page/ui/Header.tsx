"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const BROWSE_LINK = { href: "/services", label: "Browse services" };
const SIGN_IN_LINK = { href: "/auth/login", label: "Sign in" };

const SIGN_UP_LINKS = [
  {
    href: "/auth/signup?role=BUYER",
    label: "Sign up to vouch",
    variant: "secondary",
  },
  {
    href: "/auth/signup?role=LISTER",
    label: "Sign up to list",
    variant: "primary",
  },
] as const;

const DESKTOP_QUERY = "(min-width: 1024px)";

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

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
};

function DesktopNavLink({ href, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group relative rounded-sm py-2 text-sm font-medium transition-colors duration-200 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${
        active ? "text-ink" : "text-muted"
      }`}
    >
      {label}
      <span
        className={`absolute inset-x-0 bottom-0 h-px origin-left bg-brand transition-transform duration-300 ease-out ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  );
}

type ButtonLinkProps = {
  href: string;
  label: string;
  variant: "primary" | "secondary";
  size: "md" | "lg";
  withArrow?: boolean;
  onClick?: () => void;
};

function ButtonLink({
  href,
  label,
  variant,
  size,
  withArrow = false,
  onClick,
}: ButtonLinkProps) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
  const sizes = {
    md: "h-10 px-4",
    lg: "h-11 w-full px-5",
  };
  const variants = {
    primary: "bg-brand text-white hover:bg-brand-dark",
    secondary: "border border-line text-ink hover:bg-surface",
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {label}
      {withArrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Header                                                                    */
/* -------------------------------------------------------------------------- */

export function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close the menu on route change */
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  /* Close on Escape, and when the viewport grows to desktop */
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) closeMenu();
    };

    window.addEventListener("keydown", onKeyDown);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      mq.removeEventListener("change", onChange);
    };
  }, [isMenuOpen, closeMenu]);

  /* Lock body scroll while the mobile menu is open */
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  const solid = hasScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        solid
          ? "border-line/80 bg-background/90 shadow-lg backdrop-blur-2xl backdrop-saturate-150"
          : "border-transparent bg-background/20 backdrop-blur-sm"
      }`}
    >
      {/* Bar: logo | centered nav | actions */}
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto] items-center px-5 sm:px-8 md:h-[72px] lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        {/* Left: logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5 justify-self-start rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <LogoMark />
          <span className="font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
            DrukConnect
          </span>
        </Link>

        {/* Center: Browse services (desktop) */}
        <nav aria-label="Main navigation" className="hidden lg:block">
          <DesktopNavLink
            href={BROWSE_LINK.href}
            label={BROWSE_LINK.label}
            active={isActive(BROWSE_LINK.href)}
          />
        </nav>

        {/* Right: auth actions (desktop) */}
        <div className="hidden items-center gap-5 justify-self-end lg:flex">
          <DesktopNavLink
            href={SIGN_IN_LINK.href}
            label={SIGN_IN_LINK.label}
            active={isActive(SIGN_IN_LINK.href)}
          />
          <div className="flex items-center gap-2">
            {SIGN_UP_LINKS.map((link) => (
              <ButtonLink key={link.href} {...link} size="md" />
            ))}
          </div>
        </div>

        {/* Right: menu button (mobile / tablet) */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-line text-ink transition-colors duration-200 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMenuOpen ? "close" : "menu"}
              initial={
                reduceMotion ? false : { opacity: 0, rotate: -20, scale: 0.85 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? undefined
                  : { opacity: 0, rotate: 20, scale: 0.85 }
              }
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile / tablet panel */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line/60 lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-h-[calc(100dvh-4rem)] w-full max-w-7xl flex-col gap-6 overflow-y-auto px-5 pb-6 pt-4 sm:px-8"
            >
              {/* Page links */}
              <ul className="flex flex-col">
                {[BROWSE_LINK, SIGN_IN_LINK].map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href} className="border-b border-line/60">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active ? "page" : undefined}
                        className={`flex h-12 items-center justify-between text-base font-medium transition-colors duration-200 hover:text-ink ${
                          active ? "text-ink" : "text-muted"
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-4 w-4 text-muted"
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Sign-up actions */}
              <div className="grid gap-2 sm:grid-cols-2">
                {SIGN_UP_LINKS.map((link) => (
                  <ButtonLink
                    key={link.href}
                    {...link}
                    size="lg"
                    withArrow
                    onClick={closeMenu}
                  />
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
