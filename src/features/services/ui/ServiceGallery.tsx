"use client";

import { useMemo, useState } from "react";
import { ListingImage } from "../../listing/types/listing";
import { getImageUrl } from "../utils/serviceDetail.utils";

export function ServiceGallery({
  images,
  title,
}: {
  images: ListingImage[];
  title: string;
}) {
  const [activeImage, setActiveImage] = useState(0);

  const imageUrls = useMemo(
    () =>
      images
        .slice()
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((image) => getImageUrl(image.imageUrl)),
    [images],
  );

  if (!imageUrls.length) {
    return <div className="aspect-[16/9] rounded-md bg-brand-tint" />;
  }

  const safeActiveImage = activeImage < imageUrls.length ? activeImage : 0;

  return (
    <div>
      {/* Desktop: large image + two side thumbnails */}
      <div className="hidden aspect-[16/8.5] gap-2 sm:grid sm:grid-cols-[2fr_1fr]">
        <GalleryImage
          image={imageUrls[safeActiveImage]}
          title={title}
          className="h-full"
        />

        <div className="grid min-h-0 grid-rows-2 gap-2">
          {imageUrls.slice(1, 3).map((image, index) => {
            const imageIndex = index + 1;

            return (
              <GalleryImage
                key={image}
                image={image}
                title={`${title} image ${imageIndex + 1}`}
                active={safeActiveImage === imageIndex}
                onClick={() => setActiveImage(imageIndex)}
                className="h-full"
              />
            );
          })}
        </div>
      </div>

      {/* Mobile: single image + scrollable thumbnails */}
      <div className="sm:hidden">
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-brand-tint">
          <img
            src={imageUrls[safeActiveImage]}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {imageUrls.length > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {imageUrls.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`h-16 w-20 shrink-0 overflow-hidden rounded-md border ${
                  safeActiveImage === index ? "border-brand" : "border-line"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryImage({
  image,
  title,
  active = false,
  onClick,
  className = "",
}: {
  image: string;
  title: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const content = (
    <img
      src={image}
      alt={title}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
    />
  );

  if (!onClick) {
    return (
      <div
        className={`group relative min-h-0 w-full overflow-hidden rounded-md bg-brand-tint ${className}`}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative min-h-0 w-full overflow-hidden rounded-md bg-brand-tint ${
        active ? "ring-2 ring-brand ring-offset-2 ring-offset-background" : ""
      } ${className}`}
      aria-label={`View ${title}`}
    >
      {content}
    </button>
  );
}
