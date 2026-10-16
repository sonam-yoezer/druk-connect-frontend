"use client";

import { useEffect, useState } from "react";
import { useAdminFeedbackImage } from "../hooks/useAdminFeedbackImage";

type AdminFeedbackScreenshotProps = {
  feedbackId: string;
};

export function AdminFeedbackScreenshot({
  feedbackId,
}: AdminFeedbackScreenshotProps) {
  const { data, isLoading, isError } = useAdminFeedbackImage(feedbackId, true);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      setImageUrl(null);
      return;
    }

    const url = URL.createObjectURL(data);
    setImageUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [data]);

  if (isLoading) {
    return <p className="text-sm text-muted">Loading screenshot...</p>;
  }

  if (isError) {
    return <p className="text-sm text-red-600">Unable to load screenshot.</p>;
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-ink">Screenshot</p>

      <a
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src={imageUrl}
          alt="Screenshot attached to feedback"
          className="max-h-80 max-w-full rounded-lg border border-line object-contain"
        />
      </a>
    </div>
  );
}
