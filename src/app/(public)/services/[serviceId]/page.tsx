import { ServiceDetail } from "@/src/components/services/ui/ServiceDetail";
import { notFound } from "next/navigation";

const SERVICES = [
  {
    id: 1,
    title: "Bhutanese Catering",
    category: "Food",
    location: "Melbourne, VIC",
    posted: "2 days ago",
    views: 214,
    price: "$25",
    priceUnit: "per person",
    priceNote: "Custom menus available for larger events",
    images: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80",
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=900&q=80",
    ],
    description:
      "Authentic Bhutanese meals prepared for gatherings, celebrations, family events, and private occasions. Choose from traditional favourites or work with the provider to create a menu that suits your event. Catering can be arranged for small gatherings or larger celebrations across Melbourne.",
    details: [
      ["Cuisine", "Bhutanese"],
      ["Service type", "Catering"],
      ["Minimum order", "10 people"],
      ["Serves", "10–100+ guests"],
      ["Dietary options", "Vegetarian available"],
      ["Booking", "2 days notice"],
    ] as [string, string][],
    availability: "Weekdays and weekends",
    provider: {
      name: "Tashi Wangchuk",
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80",
      rating: "4.8",
      reviews: 12,
      memberSince: "1.5 yr",
      vouches: 2,
      vouchImages: [
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
      ],
    },
    reviews: [
      {
        name: "Pema D.",
        date: "2 weeks ago",
        rating: 5,
        text: "The food was delicious and everyone at our gathering loved it. Tashi was easy to communicate with and everything arrived on time.",
        tags: ["Great food", "Reliable"],
      },
      {
        name: "Karma S.",
        date: "1 month ago",
        rating: 5,
        text: "Ordered catering for a family celebration. The portions were generous and the food tasted just like home.",
        tags: ["Authentic", "Good value"],
      },
    ],
  },
];

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceId: string }>;
}) {
  const { serviceId } = await params;

  const service = SERVICES.find((item) => item.id === Number(serviceId));

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
