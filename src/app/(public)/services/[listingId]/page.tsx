import { notFound } from "next/navigation";

import { ServiceDetail } from "@/src/features/services/ui/ServiceDetail";
import { getListingById } from "@/src/features/listing/api/getListingById";

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

  return <ServiceDetail listing={listing} />;
}
