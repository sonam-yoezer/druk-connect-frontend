import type { LucideIcon } from "lucide-react";

type TrustCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function TrustCard({ icon: Icon, title, description }: TrustCardProps) {
  return (
    <div>
      <Icon className="mb-4 h-[22px] w-[22px] text-marigold" />

      <h3 className="mb-2.5 font-serif text-lg font-medium text-white">
        {title}
      </h3>

      <p className="text-sm text-[#C8CBD8]">{description}</p>
    </div>
  );
}
