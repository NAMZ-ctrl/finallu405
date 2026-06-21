"use client";

import { Color } from "@/prisma/app/generated/prisma/client";
import { useState } from "react";

interface ColorTypes {
  colors: Color[];
}
export default function ColorContainer({ colors }: ColorTypes) {
  const [productColor, setProductColor] = useState("");
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
                  className="hidden"
                  onChange={(e) => setProductColor(e.target.value)}
                />
                <label htmlFor={color.color} className={`size-10 block rounded-full transition-transform duration-300 ease-in hover:cursor-pointer ${(productColor === color.color) ? 'scale-[1.2]' : 'scale-[1]'}`} style={{backgroundColor: color.hexCode}}></label>
              </div>
            );
          })}
        </div>
      </fieldset>
    </>
  );
}
