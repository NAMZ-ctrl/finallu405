"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus} from "lucide-react";
import { useState } from "react";

export default function IncreDecre() {
  const [number, setNumber] = useState(0);
  return (
    <>
      <div className="flex items-center p-3 border-gray-200 border-2 rounded-2xl h-13">
        <Button className="bg-white text-black text-2xl font-bold hover:cursor-pointer"><Minus/></Button>
        <span className="font-bold">{number}</span>
        <Button className="bg-white text-black text-2xl font-bold hover:cursor-pointer"><Plus/></Button>
      </div>
    </>
  );
}
