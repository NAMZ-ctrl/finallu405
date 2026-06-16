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
    <div className="grid md:overflow-y-scroll">
      <div className="relative w-full aspect-square">
        <Image src={images[activeIndex]} fill alt={productName}/>
      </div>
      {/* mobile view for thumbnails */}
      <div className="md:hidden flex gap-2 justify-self-center">
        {images.map((image, index) => {
          return (
            <div key={index} onClick={() => handleImageClick(index)} className="relative size-2.5 border border-gray-300 rounded-full">
            </div>
          )
        })}
      </div>
      {/*laptop view for thumbnails */}
      <div className="max-md:hidden flex gap-2 justify-self-center">
        {images.map((image, index) => {
          return (
            <div key={index} onClick={() => handleImageClick(index)} className="relative size-16.25">
              <Image src={image} alt={productName} fill/>
            </div>
          )
        })}
      </div>
    </div>
  );
}
