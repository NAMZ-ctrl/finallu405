"use client";

import { Color } from "@/prisma/app/generated/prisma/client";
import { useState } from "react";

interface ColorTypes {
  colors: Color[],
  selectedColor: string,
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>
}
export default function ColorContainer({ colors, selectedColor, setSelectedColor }: ColorTypes) {

  return (
    <>
      <fieldset>
        <legend className="font-bold">Colors</legend>
        <div className="flex gap-3 mt-3">
          {colors.map((color, index) => {
            return (
              <div key={index}>
                <input
                  type="radio"
                  id={color.color}
                  name="color"
                  value={color.color}
                  checked={selectedColor === color.color}
                  className="hidden"
                  onChange={(e) => setSelectedColor(e.target.value)}
                />
                <label htmlFor={color.color} className={`size-10 block rounded-full transition-transform duration-300 ease-in hover:cursor-pointer ${(selectedColor === color.color) ? 'scale-[1.2]' : 'scale-[1]'}`} style={{backgroundColor: color.hexCode}}></label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}
