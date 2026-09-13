"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";

const NAV_LINKS = [
  {
    href: "/services",
    label: "Browse services",
  },
  {
    href: "/auth/signin",
    label: "Sign in",
  },
];

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

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 12);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        hasScrolled
          ? "border-line/80 bg-background/80 shadow-lg backdrop-blur-2xl backdrop-saturate-150"
          : "border-transparent bg-background/20 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-17 w-full max-w-7xl items-center justify-between px-5 sm:h-18 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-2.5"
        >
          <LogoMark />

          <span className="font-serif text-lg font-semibold tracking-tight text-ink sm:text-xl">
            DrukConnect
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
            >
              {link.label}

              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </Link>
          ))}

          <Link
            href="/auth/signup"
            className="group ml-1 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
          >
            Join DrukConnect
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-surface md:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isMenuOpen ? "close" : "menu"}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      rotate: -20,
                      scale: 0.85,
                    }
              }
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      rotate: 20,
                      scale: 0.85,
                    }
              }
              transition={{
                duration: 0.15,
              }}
              className="flex"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile navigation */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    height: 0,
                    opacity: 0,
                  }
            }
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={
              reduceMotion
                ? undefined
                : {
                    height: 0,
                    opacity: 0,
                  }
            }
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden border-t border-line bg-background/95 backdrop-blur-2xl md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex w-full max-w-7xl flex-col px-5 py-3 sm:px-8"
            >
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: -6,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: reduceMotion ? 0 : 0.04 + index * 0.05,
                    duration: 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between border-b border-line py-4 text-sm font-medium text-ink"
                  >
                    {link.label}

                    <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: -6,
                      }
                }
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: reduceMotion ? 0 : 0.14,
                  duration: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/auth/signup"
                  onClick={closeMenu}
                  className="group mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
                >
                  Join DrukConnect
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
