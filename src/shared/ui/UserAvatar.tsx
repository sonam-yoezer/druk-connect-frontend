"use client";

import { useState } from "react";

export function UserAvatar({ name, imageUrl, size = 40, className = "" }: {
  name: string; imageUrl?: string | null; size?: number; className?: string;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const source = imageUrl?.startsWith("/") ? `${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}${imageUrl}` : imageUrl;
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "?";
  return <span title={name} style={{ width: size, height: size, fontSize: Math.max(9, size * 0.32) }}
    className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-tint font-semibold text-brand ${className}`}>
    {source && failedUrl !== source ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={source} alt={name} onError={() => setFailedUrl(source)} className="h-full w-full object-cover" />
    ) : initials}
  </span>;
}
