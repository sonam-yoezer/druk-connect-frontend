import { Clock3, Shield, Users } from "lucide-react";

import { TrustCard } from "./trust-card";

const trustItems = [
  {
    icon: Shield,
    title: "Phone-verified members",
    description:
      "Everyone signs up with a verified phone number, so you know who you're talking to.",
  },
  {
    icon: Users,
    title: "Community vouching",
    description:
      "Providers need 2 vouches from members who know them before they can list — not just a phone number.",
  },
  {
    icon: Clock3,
    title: "No middlemen",
    description:
      "You contact the provider directly on WhatsApp, phone, or email. We just help you find them.",
  },
];

export function TrustSection() {
  return (
    <section className="bg-ink text-white">
      <div className="wrap grid grid-cols-3 gap-10 py-14 max-[860px]:grid-cols-1">
        {trustItems.map((item) => (
          <TrustCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
