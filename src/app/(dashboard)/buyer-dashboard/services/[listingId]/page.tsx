import { notFound } from "next/navigation";

import { getListingById } from "@/src/components/listing/api/getListingById";
import { BuyerServiceDetail } from "@/src/components/services/ui/BuyerServiceDetail";

type ServiceDetailPageProps = {
  params: Promise<{
    listingId: string;
  }>;
};

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { listingId } = await params;

  const listing = await getListingById(listingId);

  if (!listing) {
    notFound();
  }

  return <BuyerServiceDetail listing={listing} />;
}
