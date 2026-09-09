import Link from "next/link";

function LogoMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2L25 22H3L14 2Z"
        stroke="#7A2E33"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path d="M14 10L19 19H9L14 10Z" fill="#E0A03B" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="py-11 pb-10">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-serif text-[17px] font-semibold text-ink"
          >
            <LogoMark />
            DrukConnect
          </Link>

          <div className="flex gap-14 text-sm max-[640px]:w-full max-[640px]:justify-between max-[500px]:gap-6">
            <div className="flex flex-col gap-2.5">
              <b className="text-[13px] text-slate">Explore</b>

              <Link href="/services" className="hover:text-maroon">
                Browse services
              </Link>

              <Link href="/auth/signup" className="hover:text-maroon">
                Post a service
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <b className="text-[13px] text-slate">Community</b>

              <Link href="/how-it-works" className="hover:text-maroon">
                How it works
              </Link>

              <Link href="/safety" className="hover:text-maroon">
                Safety tips
              </Link>
            </div>

            <div className="flex flex-col gap-2.5">
              <b className="text-[13px] text-slate">Support</b>

              <Link href="/contact" className="hover:text-maroon">
                Contact us
              </Link>

              <Link href="/report" className="hover:text-maroon">
                Report a listing
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-9 text-[13px] text-slate">
          Made for the Bhutanese community in Australia.
        </div>
      </div>
    </footer>
  );
}
