import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, ArrowUpRight, Lock, Scale } from "lucide-react";
import { Header } from "@/src/features/landing-page/ui/Header";

/* ------------------------------------------------------------------ */
/* Config — fill these in before going live                            */
/* ------------------------------------------------------------------ */

const IS_DRAFT = true;
const VERSION = "0.1";
const LAST_UPDATED = "[DATE]";
const PRIVACY_EMAIL = "[PRIVACY EMAIL]";
const OPERATOR_NAME = "[OPERATOR LEGAL NAME]";
const HOSTING_PROVIDER = "[HOSTING PROVIDER]";
const SMS_PROVIDER = "[SMS VERIFICATION PROVIDER]";
const EMAIL_PROVIDER = "[EMAIL PROVIDER]";
const ANALYTICS_PROVIDER = "[ANALYTICS PROVIDER]";
const OVERSEAS_COUNTRIES = "[COUNTRIES]";
const RETENTION_PERIOD = "[RETENTION PERIOD]";

export const metadata: Metadata = {
  title: "Privacy Policy — DrukConnect",
  description:
    "What personal information DrukConnect collects, how we use it, who can see it, and how to access or delete it.",
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const isPlaceholder = (value: string) => value.startsWith("[");

function Placeholder({ children }: { children: ReactNode }) {
  return (
    <span className="border border-brand/30 bg-brand/10 px-1.5 py-0.5 font-mono text-[0.85em] text-brand">
      {children}
    </span>
  );
}

function Value({ value, href }: { value: string; href?: string }) {
  if (isPlaceholder(value)) return <Placeholder>{value}</Placeholder>;
  if (href)
    return (
      <a
        href={href}
        className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
      >
        {value}
      </a>
    );
  return <>{value}</>;
}

function ReviewNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-5 flex gap-3 border border-dashed border-brand/40 bg-brand/5 p-4 text-sm leading-6 text-ink">
      <Scale className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
      <p>{children}</p>
    </div>
  );
}

const linkClass =
  "font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand";

const termsLink = (
  <Link href="/terms" className={linkClass}>
    Terms &amp; Conditions
  </Link>
);

const email = <Value value={PRIVACY_EMAIL} href={`mailto:${PRIVACY_EMAIL}`} />;

const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="font-semibold text-ink">{children}</strong>
);

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Section = {
  id: string;
  title: string;
  paragraphs?: ReactNode[];
  bullets?: ReactNode[];
  after?: ReactNode[];
  note?: ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "who-we-are",
    title: "Who we are and what this policy covers",
    paragraphs: [
      <>
        DrukConnect is operated by <Value value={OPERATOR_NAME} />{" "}
        (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;the Platform&rdquo;). This
        Privacy Policy explains how we collect, use, disclose, and protect
        personal information when you browse DrukConnect, create an account,
        post a Listing, contact another member, leave a review, or vouch for
        someone.
      </>,
      <>
        We aim to handle personal information in line with the{" "}
        <em>Privacy Act 1988</em> (Cth) and the Australian Privacy Principles
        (APPs). This policy should be read together with our {termsLink}.
      </>,
    ],
    note: IS_DRAFT
      ? "Confirm with a lawyer whether the operator is an APP entity under the Privacy Act (some small businesses are exempt) and adjust this wording accordingly. Following the APPs is good practice either way."
      : undefined,
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    bullets: [
      <>
        <Strong>Account details</Strong> — your name, phone number, email
        address, and password (stored in hashed form, never in plain text).
      </>,
      <>
        <Strong>Profile and Listing content</Strong> — descriptions, prices,
        availability, photos, service categories, and your general location (for
        example, suburb and state).
      </>,
      <>
        <Strong>Category confirmations</Strong> — facts you confirm when
        publishing in certain categories, such as holding valid vehicle
        registration and insurance.
      </>,
      <>
        <Strong>Activity on the Platform</Strong> — contact requests you make or
        receive, reviews and replies, vouches you give or receive, and reports
        you submit.
      </>,
      <>
        <Strong>Moderation records</Strong> — reports made about you, warnings,
        suspensions, appeals, and the reasons recorded for them.
      </>,
      <>
        <Strong>Technical data</Strong> — IP address, device and browser type,
        pages visited, and similar usage information collected through cookies
        and analytics.
      </>,
    ],
    after: [
      "We do not ask for, and you should not post, sensitive information such as health details, religious beliefs, or government ID numbers in Listings, reviews, or messages.",
    ],
  },
  {
    id: "how-we-collect",
    title: "How we collect it",
    bullets: [
      "Directly from you — when you sign up, verify your phone, create a Listing, or contact us.",
      "Automatically — through cookies, server logs, and analytics when you use the Platform.",
      "From other members — when someone reviews you, vouches for you, reports you, or logs contact with you.",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    bullets: [
      "To create and manage your account and verify your phone number.",
      "To publish your Listings and connect you with other members.",
      "To show trust signals such as reviews, ratings, and vouches.",
      "To investigate reports, moderate content, prevent fraud, and keep the community safe.",
      "To send you service messages, such as verification codes, contact notifications, and moderation decisions.",
      "To understand how the Platform is used and improve it.",
      "To comply with our legal obligations.",
    ],
    after: [
      "We will only send you marketing messages if you have agreed to receive them, and every marketing message will include a way to opt out.",
    ],
  },
  {
    id: "public-information",
    title: "What other members can see",
    paragraphs: [
      "Some information is public by design, because the Platform only works if members can see who they are dealing with:",
    ],
    bullets: [
      "Your display name, general location, and Listings.",
      "Reviews you leave and receive, and replies to them.",
      "Vouches you give and receive.",
      "Your verified status.",
    ],
    after: [
      <>
        We do not publicly display your phone number or email address. Contact
        details are only shared with another member when you choose to share
        them.
      </>,
    ],
    note: IS_DRAFT
      ? "Confirm this section matches exactly how contact details are revealed in the product (for example, whether a phone number is shown after a contact request is accepted)."
      : undefined,
  },
  {
    id: "sharing",
    title: "Who we share it with",
    paragraphs: [
      <>
        We <Strong>do not sell</Strong> your personal information. We share it
        only in these situations:
      </>,
    ],
    bullets: [
      <>
        <Strong>Service providers</Strong> who help us run the Platform, such as
        hosting (<Value value={HOSTING_PROVIDER} />
        ), SMS verification (
        <Value value={SMS_PROVIDER} />
        ), email delivery (
        <Value value={EMAIL_PROVIDER} />
        ), and analytics (
        <Value value={ANALYTICS_PROVIDER} />
        ). They may only use it to provide their services to us.
      </>,
      "Law enforcement, regulators, or courts, where required or authorised by law, or where we reasonably believe disclosure is necessary to prevent serious harm.",
      "A buyer or successor, if DrukConnect is sold, merged, or restructured, subject to this policy continuing to apply.",
      "Anyone else, with your consent.",
    ],
  },
  {
    id: "overseas",
    title: "Overseas storage and access",
    paragraphs: [
      <>
        Some of our service providers store or process data outside Australia,
        including in <Value value={OVERSEAS_COUNTRIES} />. Where personal
        information is disclosed overseas, we take reasonable steps to ensure it
        is handled consistently with the Australian Privacy Principles.
      </>,
    ],
    note: IS_DRAFT
      ? "List every country where data is stored or accessed — including any location the platform team accesses data from. Access from overseas counts as an overseas disclosure under APP 8."
      : undefined,
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "We use essential cookies to keep you signed in and keep the Platform secure. We may also use analytics cookies to understand how people use DrukConnect. You can block or delete cookies in your browser settings, but some features, such as staying signed in, may not work without them.",
    ],
  },
  {
    id: "security",
    title: "How we protect it",
    paragraphs: [
      "We use reasonable technical and organisational measures to protect personal information from misuse, loss, and unauthorised access — including encrypted connections (HTTPS), hashed passwords, and restricted staff access to member data. No online service is completely secure, so please use a strong, unique password and tell us straight away if you suspect your account has been compromised.",
      "If a data breach is likely to cause serious harm, we will notify affected members and, where required, the Office of the Australian Information Commissioner (OAIC).",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    paragraphs: [
      <>
        We keep personal information while your account is active and for{" "}
        <Value value={RETENTION_PERIOD} /> afterwards, or longer where we need
        it to resolve disputes, enforce our Terms, or meet legal obligations.
      </>,
      "When you delete your account, we remove or de-identify your profile and Listings. Reviews you left may remain on the Platform with your name removed, so that other members' ratings stay accurate. Moderation records may be kept to prevent suspended members from re-registering.",
    ],
    note: IS_DRAFT
      ? "Set a concrete retention period and make sure the product's account-deletion behaviour matches this description."
      : undefined,
  },
  {
    id: "your-rights",
    title: "Your choices and rights",
    paragraphs: ["You can:"],
    bullets: [
      "Access and update most of your information from your account settings at any time.",
      <>
        Ask for a copy of the personal information we hold about you by emailing{" "}
        {email}.
      </>,
      "Ask us to correct information that is inaccurate, out of date, or incomplete.",
      "Delete your account, subject to the retention rules above.",
      "Opt out of marketing messages at any time.",
    ],
    after: [
      "We will respond to access and correction requests within 30 days. We may need to verify your identity first, and in limited cases permitted by law we may refuse a request — if so, we will explain why.",
    ],
  },
  {
    id: "age",
    title: "Age requirement",
    paragraphs: [
      "DrukConnect is intended for people aged 18 and over. We do not knowingly collect personal information from anyone under 18. If you believe a minor has created an account, please contact us and we will remove it.",
    ],
  },
  {
    id: "complaints",
    title: "Complaints",
    paragraphs: [
      <>
        If you have a concern about how we have handled your personal
        information, please email {email}. We will acknowledge your complaint
        promptly and aim to resolve it within 30 days.
      </>,
      <>
        If you are not satisfied with our response, you can complain to the
        Office of the Australian Information Commissioner at{" "}
        <a
          href="https://www.oaic.gov.au"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          oaic.gov.au
        </a>
        .
      </>,
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. We will notify members of material changes, and the date at the top of this page shows when it was last updated.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      <>Questions or requests about your privacy can be sent to {email}.</>,
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function PrivacyPage() {
  return (
    <main className="bg-background">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 -top-40 h-125 w-125 rounded-full bg-jade/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
        </div>

        <Header />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="h-3.5 w-3.5 text-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Legal
            </span>
          </div>

          <h1 className="font-serif text-[42px] font-medium leading-[0.98] tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[64px]">
            Privacy <span className="text-brand">Policy</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted">
            What we collect, why we collect it, who can see it, and how to get
            it back or delete it.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-xs font-medium text-muted">
            {IS_DRAFT && (
              <span className="border border-brand/30 bg-brand/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">
                Draft
              </span>
            )}
            <span>
              Last updated <Value value={LAST_UPDATED} />
            </span>
            <span className="hidden h-3 w-px bg-line-strong sm:block" />
            <span>Version {VERSION}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-16 lg:grid-cols-[260px_1fr] lg:gap-16 lg:px-10 lg:py-20">
        {/* Table of contents */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            On this page
          </p>
          <nav aria-label="Privacy policy sections">
            <ol className="space-y-px border-l border-line">
              {SECTIONS.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="group -ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-xs text-muted transition-colors duration-200 hover:border-brand hover:text-ink"
                  >
                    <span className="w-4 shrink-0 tabular-nums text-muted/70 group-hover:text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <article className="min-w-0 max-w-3xl">
          {/* Draft notice */}
          {IS_DRAFT && (
            <div className="mb-12 border border-line-strong bg-surface p-2 shadow-[0_30px_80px_rgba(0,0,0,0.06)]">
              <div className="flex gap-4 border border-line bg-background p-5 sm:p-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-brand/10">
                  <AlertTriangle className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">
                    Important — read before using this document
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    This is a draft template written for planning purposes, not
                    a finished legal document. It has not been reviewed by a
                    lawyer and should not be published or relied on as-is. Have
                    an Australian lawyer review it against the Privacy Act and
                    the Australian Privacy Principles — and check that every
                    statement matches how the product actually handles data —
                    before this goes live. This content is not legal advice.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="mb-12 grid gap-px border border-line bg-line sm:grid-cols-3">
            {[
              [
                "We don't sell",
                "Your data is never sold to advertisers or brokers.",
              ],
              [
                "Phone stays private",
                "Your number isn't shown publicly on your profile.",
              ],
              [
                "You're in control",
                "Access, correct, or delete your data any time.",
              ],
            ].map(([title, body]) => (
              <div key={title} className="bg-surface p-5">
                <p className="text-sm font-semibold text-ink">{title}</p>
                <p className="mt-1.5 text-xs leading-5 text-muted">{body}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12">
            {SECTIONS.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-t border-line pt-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-sm tabular-nums text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-[28px]">
                    {section.title}
                  </h2>
                </div>

                <div className="mt-5 space-y-4 text-[15px] leading-7 text-muted">
                  {section.paragraphs?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}

                  {section.bullets && (
                    <ul className="space-y-3">
                      {section.bullets.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 bg-jade" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.after?.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {section.note && <ReviewNote>{section.note}</ReviewNote>}
              </section>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border border-line bg-surface p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-serif text-xl tracking-tight text-ink">
                Have a privacy question?
              </p>
              <p className="mt-1 text-sm text-muted">
                Read our Terms or get in touch — we&apos;re happy to help.
              </p>
            </div>
            <Link
              href="/terms"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-md border border-line-strong bg-background px-5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-ink"
            >
              Terms &amp; Conditions
              <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
