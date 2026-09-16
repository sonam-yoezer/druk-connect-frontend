import { notFound } from "next/navigation";

import { ServiceDetail } from "@/src/components/services/ui/ServiceDetail";
import { getListingById } from "@/src/components/listing/api/getListingById";

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
