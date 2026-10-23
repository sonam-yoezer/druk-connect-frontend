"use client";

import { ListingDetails } from "../listing/types/listing";
import { useReviewFlow, useReportFlow } from "./hooks/useServiceDetailFlows";
import { ProviderCard, BookingNotice } from "./ui/ProviderCard";
import ReportScamModal from "./ui/ReportScamModal";
import {
  ReviewStatusMessages,
  ReviewPrompt,
  ReviewModal,
} from "./ui/ReviewDialogs";
import { ServiceGallery } from "./ui/ServiceGallery";
import {
  ServiceBreadcrumb,
  ServiceHeader,
  AboutSection,
  ServiceDetailsSection,
  AvailabilitySection,
  ReviewsSection,
} from "./ui/ServiceSections";

type ServiceDetailProps = {
  listing: ListingDetails;
  reviewRequestId?: string;
  autoReview?: boolean;
  contactReturn?: boolean;
};

export function BuyerServiceDetail({
  listing,
  reviewRequestId,
  autoReview = false,
  contactReturn = false,
}: ServiceDetailProps) {
  const review = useReviewFlow({
    listingId: listing.id,
    reviewRequestId,
    autoReview,
    contactReturn,
  });
  const report = useReportFlow(listing.id);

  return (
    <>
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8 lg:px-10 lg:pb-24">
          <ServiceBreadcrumb listing={listing} />

          <ReviewStatusMessages
            review={review}
            reviewRequestId={reviewRequestId}
          />

          {report.error && (
            <p
              role="alert"
              className="mt-4 rounded-md bg-danger-tint p-4 text-danger"
            >
              {report.error}
            </p>
          )}

          {report.notice && (
            <p role="status" className="mt-4 rounded-md bg-brand-tint p-4">
              {report.notice}
            </p>
          )}

          <div className="mt-7 grid items-start gap-10 lg:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)] lg:gap-12">
            <div className="min-w-0">
              <ServiceGallery
                images={listing.images}
                title={listing.listingTitle}
              />
              <ServiceHeader listing={listing} />
              <AboutSection description={listing.description} />
              <ServiceDetailsSection listing={listing} />
              <AvailabilitySection listing={listing} />
              <ReviewsSection listing={listing} />
            </div>

            <aside className="lg:sticky lg:top-24">
              <ProviderCard
                listing={listing}
                onContact={review.handleContacted}
                onReport={report.open}
              />
              <BookingNotice />
            </aside>
          </div>
        </div>
      </main>

      {review.isPromptOpen && (
        <ReviewPrompt
          listingTitle={listing.listingTitle}
          onYes={review.acceptReviewPrompt}
          onClose={review.dismissReviewPrompt}
        />
      )}

      {review.isModalOpen && (
        <ReviewModal
          listing={listing}
          onClose={review.closeReviewModal}
          onSubmitted={review.handleReviewSubmitted}
        />
      )}

      {report.isOpen && (
        <ReportScamModal
          reason={report.reason}
          details={report.details}
          error={report.error}
          isSubmitting={report.isSubmitting}
          onReasonChange={report.setReason}
          onDetailsChange={report.setDetails}
          onSubmit={report.submit}
          onClose={report.close}
        />
      )}
    </>
  );
}
