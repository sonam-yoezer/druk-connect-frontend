import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, ArrowUpRight, FileText, Scale } from "lucide-react";
import { Header } from "@/src/features/landing-page/ui/Header";

/* ------------------------------------------------------------------ */
/* Config — fill these in before going live                            */
/* ------------------------------------------------------------------ */

const IS_DRAFT = true;
const VERSION = "0.1";
const LAST_UPDATED = "[DATE]";
const SUPPORT_EMAIL = "[SUPPORT EMAIL]";
const GOVERNING_STATE = "[STATE/TERRITORY]";

export const metadata: Metadata = {
  title: "Terms & Conditions — DrukConnect",
  description:
    "The terms that govern browsing, listing, contacting, reviewing and vouching on DrukConnect.",
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

const privacyLink = (
  <Link
    href="/privacy"
    className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
  >
    Privacy Policy
  </Link>
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
    title: "Who we are and what this document covers",
    paragraphs: [
      <>
        DrukConnect (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;the
        Platform&rdquo;) is an online listing service that lets members of the
        Bhutanese-Australian community post services they offer
        (&ldquo;Listings&rdquo;) and connect with other members who are looking
        for those services. These Terms &amp; Conditions (&ldquo;Terms&rdquo;)
        govern your use of DrukConnect, whether you are browsing, listing a
        service, contacting another member, leaving a review, or vouching for
        someone.
      </>,
      <>
        By creating an account, you agree to these Terms and to our{" "}
        {privacyLink}. If you do not agree, please do not create an account or
        use the Platform beyond browsing publicly available Listings.
      </>,
    ],
  },
  {
    id: "what-we-are",
    title: "What DrukConnect is — and is not",
    paragraphs: [
      <>
        DrukConnect is a{" "}
        <strong className="font-semibold text-ink">
          listing and discovery platform only
        </strong>
        . We do not provide the services listed, we are not a party to any
        arrangement between members, and we do not handle payments, bookings,
        contracts, insurance, or delivery of any service.
      </>,
    ],
    bullets: [
      "We do not verify the accuracy of any Listing, the identity claims of any member beyond phone verification, or the qualifications, licensing, insurance, or fitness of any provider.",
      "Community “vouching” and star ratings are member-generated trust signals, not a guarantee or endorsement by DrukConnect.",
      "Arrangements, payments, and the performance of any service are solely between the members involved. DrukConnect is not responsible for the outcome of any transaction or interaction.",
    ],
  },
  {
    id: "eligibility",
    title: "Eligibility and your account",
    bullets: [
      "You must be able to form a legally binding contract under Australian law to create an account.",
      "You must provide a valid phone number and complete phone verification before you can post a Listing, contact another member, leave a review, or vouch for another member.",
      "You are responsible for keeping your account credentials secure and for all activity under your account.",
      "You may not create more than one account, or an account on behalf of someone else without their knowledge and consent.",
    ],
  },
  {
    id: "community-guidelines",
    title: "Community guidelines",
    paragraphs: [
      "By using DrukConnect you agree to the following, which form part of these Terms:",
    ],
    bullets: [
      "Never send money, deposits, or gift cards to another member before meeting in person or receiving the service.",
      "Listings must be honest and accurate — including price, availability, photos, and description.",
      "Treat other members respectfully. Harassment, discrimination, or abusive conduct is not permitted.",
      "Report any Listing, message, or member behaviour that seems dishonest, unsafe, or against these Terms.",
    ],
  },
  {
    id: "vouching",
    title: "Vouching",
    paragraphs: [
      "Vouching is an optional feature where an existing verified member can vouch that they personally know and trust another member. By vouching for someone, you acknowledge that:",
    ],
    bullets: [
      "Your vouch is a public statement of trust visible to other members.",
      "If a member you vouched for is suspended for a serious violation of these Terms, your own account may be reviewed as a result.",
      "You should only vouch for people you genuinely know and would recommend.",
    ],
  },
  {
    id: "listings",
    title: "Listings",
    bullets: [
      "You may only post Listings for services you are actually able and entitled to provide.",
      "Certain categories (for example, vehicle rental) require you to confirm specific facts before publishing — for example, that you hold valid registration and insurance. You are solely responsible for the accuracy of any such confirmation.",
      "Once a Listing has received reviews, its title and photos cannot be edited. Availability and pricing can be updated at any time. To materially change what is being offered, you must create a new Listing.",
      "We may remove any Listing, or suspend or terminate any account, that we reasonably believe violates these Terms, applicable law, or poses a risk to other members.",
    ],
  },
  {
    id: "reviews",
    title: "Reviews and feedback",
    bullets: [
      "Reviews must reflect a genuine interaction with the provider and may only be submitted after contact has been logged through the Platform.",
      "Reviews containing potentially defamatory or unverifiable serious allegations (for example, accusations of fraud) may be held for moderator review before publishing.",
      "You may not submit false, fabricated, or misleading reviews.",
      "Providers may reply once to any review left on their Listing.",
    ],
  },
  {
    id: "prohibited-conduct",
    title: "Prohibited conduct",
    paragraphs: [
      "In addition to the community guidelines above, you must not use DrukConnect to:",
    ],
    bullets: [
      "Offer or solicit anything illegal under Australian law;",
      "Impersonate another person or misrepresent your identity, affiliation, or qualifications;",
      "Attempt to circumvent phone verification, moderation, or reporting systems;",
      "Scrape, harvest, or misuse other members’ contact information or personal data;",
      "Use the Platform to advertise, recruit for, or conduct any scheme intended to defraud another member.",
    ],
  },
  {
    id: "moderation",
    title: "Moderation, warnings, and suspension",
    paragraphs: [
      "We may, at our discretion, dismiss a report, issue a warning, remove a Listing or review, or suspend an account in response to a report or a flagged review. Where we suspend an account, we will state the reason and you may submit an appeal, which will be reviewed by a different moderator than the one who made the original decision. Browsing remains available during a suspension; posting, contacting, and reviewing do not.",
    ],
  },
  {
    id: "liability",
    title: "Disclaimers and limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by Australian law, including the Australian Consumer Law:",
    ],
    bullets: [
      "DrukConnect is provided on an “as is” and “as available” basis, without warranties of any kind regarding the accuracy, safety, legality, or quality of any Listing or member.",
      "We are not liable for any loss, damage, injury, or dispute arising from a transaction, interaction, or arrangement between members, including but not limited to vehicle rentals, food safety, or personal injury.",
      "Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right, or remedy under the Australian Consumer Law that cannot lawfully be excluded.",
    ],
    note: IS_DRAFT
      ? "This section requires review by an Australian lawyer to ensure the liability limitations are enforceable and consistent with the Australian Consumer Law and any applicable state regulations, particularly around vehicle hire and food-related services."
      : undefined,
  },
  {
    id: "indemnity",
    title: "Indemnity",
    paragraphs: [
      "You agree to indemnify DrukConnect against any claim, loss, or damage arising from your breach of these Terms, your Listing, or your conduct on the Platform, to the extent permitted by law.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    paragraphs: [
      <>
        Our {privacyLink} explains what personal information we collect
        (including your phone number, location, and any content you post) and
        how we use, store, and protect it. By using DrukConnect you agree to
        that Privacy Policy.
      </>,
    ],
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    paragraphs: [
      "We may update these Terms from time to time. We will notify members of material changes, and continued use of the Platform after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    paragraphs: [
      <>
        These Terms are governed by the laws of{" "}
        <Value value={GOVERNING_STATE} />, Australia.
      </>,
    ],
    note:
      IS_DRAFT && isPlaceholder(GOVERNING_STATE)
        ? "Confirm the appropriate jurisdiction with a lawyer based on where the platform operator is registered."
        : undefined,
  },
  {
    id: "contact",
    title: "Contact",
    paragraphs: [
      <>
        Questions about these Terms can be sent to{" "}
        <Value value={SUPPORT_EMAIL} href={`mailto:${SUPPORT_EMAIL}`} />.
      </>,
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TermsPage() {
  return (
    <main className="bg-background">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 -top-40 h-125 w-125 rounded-full bg-brand/5 blur-3xl" />
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
            <FileText className="h-3.5 w-3.5 text-brand" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Legal
            </span>
          </div>

          <h1 className="font-serif text-[42px] font-medium leading-[0.98] tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[64px]">
            Terms &amp; <span className="text-brand">Conditions</span>
          </h1>

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
          <nav aria-label="Terms sections">
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
                    an Australian lawyer review and adapt it — particularly the
                    liability, insurance, and consumer law sections — before
                    this goes live for real users. This content is not legal
                    advice.
                  </p>
                </div>
              </div>
            </div>
          )}

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
                Ready to get started?
              </p>
              <p className="mt-1 text-sm text-muted">
                Browse trusted services from the community.
              </p>
            </div>
            <Link
              href="/services"
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-brand px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
            >
              Browse services
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
