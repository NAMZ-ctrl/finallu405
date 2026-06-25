"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageProps {
  images: string[];
  productName: string;
}

export default function ProductImage({
  images,
  productName,
}: ProductImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const prev = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className="w-full">
      {/* ── Desktop: side thumbnails + main image ── */}
      <div className="hidden md:flex gap-3 sticky top-4">
        {/* thumbnail strip */}
        <div className="flex flex-col gap-2 w-18">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border transition-all duration-150 shrink-0
                ${
                  activeIndex === index
                    ? "border-foreground ring-1 ring-foreground"
                    : "border-border hover:border-foreground/40"
                }`}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>

        {/* main image */}
        <div className="relative flex-1 aspect-square rounded-2xl overflow-hidden bg-muted">
          <Image
            src={images[activeIndex]}
            alt={productName}
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 1280px) 50vw, 600px"
            priority
          />
          {/* counter badge */}
          <span className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm border border-border rounded-full px-2.5 py-1">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* ── Mobile: full-width image + arrows + dots ── */}
      <div className="md:hidden">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
          <Image
            src={images[activeIndex]}
            alt={productName}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />

          {/* only show arrows if more than 1 image */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
        </div>

        {/* dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`rounded-full transition-all duration-200
                  ${
                    activeIndex === index
                      ? "w-4 h-1.5 bg-foreground"
                      : "w-1.5 h-1.5 bg-border hover:bg-foreground/40"
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
