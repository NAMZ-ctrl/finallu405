"use client";
import type { Product } from "@/app/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function EachProduct({ product }: { product: Product }) {
  const [imageIdx, setImageIdx] = useState(0);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block w-40 sm:w-50 border border-border rounded-xl overflow-hidden bg-background hover:border-foreground/30 transition-colors duration-200"
    >
      {/* image */}
      <div
        className="relative bg-muted w-full aspect-square overflow-hidden"
        onMouseEnter={() => {
          if (product.images.length > 1) setImageIdx(1);
        }}
        onMouseLeave={() => setImageIdx(0)}
      >
        <Image
          src={product.images[imageIdx]}
          alt={product.name}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="200px"
        />
      </div>

      {/* info */}
      <div className="px-3 py-3">
        <p className="text-sm font-medium leading-snug line-clamp-2 text-foreground">
          {product.name}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          ₦{Number(product.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}