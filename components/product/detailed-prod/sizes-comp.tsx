"use client"
import { SquareArrowOutUpRight} from "lucide-react";
import { useState } from "react";
import { Size } from "@/prisma/app/generated/prisma/client";

interface SizeProp{
  sizes: Size[]
}
export default function SizeContainer({sizes}: SizeProp) {
  const [productSize, setProductSize] = useState("");
  console.log("sizes", sizes)
  return (
    <>
      <div className="grid gap-4">
        <button className="font-bold flex gap-1 items-center bg-white text-black">
          <span className="uppercase">Size Guide</span>
          <SquareArrowOutUpRight size={15} className="font-bold"/>
        </button>
       <fieldset className="flex flex-col gap-3">
        <legend className="font-bold">Size</legend>
        <div className="flex mt-3">
          {sizes.map((size, index) => {
            return (
              <div key={index} className="flex md:justify-start flex-wrap gap-y-2 max-md:justify-between">
                <input type="radio" id={size.name} name="size" className={`hidden`} value={size.name}  onChange={(e) => setProductSize(e.target.value)} />
                <label htmlFor={size.name} className={`border-gray-200 border-2 w-14 h-10 ${(productSize === size.name) ? 'text-white bg-black' : 'text-black bg-white'} rounded-2xl flex items-center justify-center p-2 hover:cursor-pointer mr-3 transition-colors ease-in duration-300`}>
                  {size.name}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>
      </div>
    </>
  );
}
