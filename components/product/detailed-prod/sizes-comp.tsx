"use client";

import { SquareArrowOutUpRight } from "lucide-react";
import React from "react";
import { Size } from "@/prisma/app/generated/prisma/client";
import SizeGuide from "./size-guide";
import { useModal } from "@/store/modalStore";

interface SizeProp {
  sizes: Size[];
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  selectedSize: string;
  guide: string;   // ← pass the guide image url down
}

export default function SizeContainer({ sizes, setSelectedSize, selectedSize, guide }: SizeProp) {
  const { handleOpenClick } = useModal(); // ← hook, not .getState()

  return (
    <div className="grid gap-4">
      {/* size guide trigger */}
      <button
        type="button"
        onClick={handleOpenClick}
        className="font-bold flex gap-1 items-center w-fit text-sm hover:opacity-70 transition-opacity"
      >
        <span className="uppercase">Size Guide</span>
        <SquareArrowOutUpRight size={13} />
      </button>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-bold">Size</legend>
        <div className="flex flex-wrap gap-2 mt-2">
          {sizes.map((size, index) => (
            <div key={index}>
              <input
                type="radio"
                id={size.name}
                name="size"
                className="hidden"
                value={size.name}
                checked={selectedSize === size.name}
                onChange={(e) => setSelectedSize(e.target.value)}
              />
              <label
                htmlFor={size.name}
                className={`border-2 w-14 h-10 rounded-2xl flex items-center justify-center p-2 hover:cursor-pointer transition-colors duration-200 text-sm font-medium
                  ${selectedSize === size.name
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-200 hover:border-gray-400"
                  }`}
              >
                {size.name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      {/* render the modal here inside SizeContainer so it's scoped */}
      <SizeGuide guide={guide} />
    </div>
  );
}