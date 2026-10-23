import { notFound } from "next/navigation";

import { getListingById } from "@/src/features/listing/api/getListingById";
import { BuyerServiceDetail } from "@/src/features/services/BuyerServiceDetail";

type ServiceDetailPageProps = {
  searchParams: Promise<{
    reviewRequest?: string;
    review?: string;
    contactReturn?: string;
  }>;
  params: Promise<{
    listingId: string;
  }>;
};

export default async function ServiceDetailPage({
  params,
  searchParams,
}: ServiceDetailPageProps) {
  const { listingId } = await params;
  const query = await searchParams;

  const listing = await getListingById(listingId);

  if (!listing) {
    notFound();
  }

  return (
    <BuyerServiceDetail
      listing={listing}
      reviewRequestId={query.reviewRequest}
      autoReview={query.review === "true"}
      contactReturn={query.contactReturn === "true"}
    />
  );
}
