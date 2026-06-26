"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function IncreDecre() {

  const [number, setNumber] = useState(1);

  const increment = () => {
    setNumber(number + 1);
  };

  const decrement = () => {
    setNumber((number) => (number <= 1 ? 1 : number - 1));
  };
  return (
    <>
      <div className="flex">
        <input type="number" className="hidden" name="qty" id="qty" value={number} onChange={(e) => e.target.value}/>
        <label
          htmlFor="qty"
          className="flex items-center p-3 border-gray-200 border-2 rounded-2xl h-13"
        >
          <Button
            className="bg-white text-black text-2xl font-bold hover:cursor-pointer"
            onClick={decrement}
            type="button"
          >
            <Minus />
          </Button>
          <span className="font-bold">{number}</span>
          <Button
            className="bg-white text-black text-2xl font-bold hover:cursor-pointer"
            onClick={increment}
            type="button"
          >
            <Plus />
          </Button>
        </label>
      </div>
    </>
  );
}
