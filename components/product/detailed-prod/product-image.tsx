"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
  images: string[];
  productName: string;
}

export default function ProductImage({
  images,
  productName,
}: ProductImageProps) {
  console.log("these are the images", images);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="grid auto-rows-auto">
        <div className="relative size-full h-115">
          <Image
            src={images[activeIndex]}
            alt={productName}
            fill
            className="absolute z-2 w-full h-115"
          />
          <div className="flex gap-3 justify-self-center absolute z-3 bottom-0 p-3">
            {images.length > 0 &&
              images.map((image, index) => {
                return (
                  <div
                    className="size-4 border-2 border-gray-200 hover:cursor-pointer rounded-full"
                    onClick={() => handleImageClick(index)}
                  ></div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
