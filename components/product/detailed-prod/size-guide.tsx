"use client";

import { X } from "lucide-react";
import { ProductGuideProps } from "@/types/store";
import Image from "next/image";
import { useModal } from "@/store/modalStore";

export default function SizeGuide({ guide }: ProductGuideProps) {
  const { open, handleOpenClick } = useModal.getState();
  console.log("check if it is", open);
  return (
    <>
      <div className="absolute w-full h-65 z-99 bg-white top-1/2 -translate-y-1/2 p-5 flex flex-col">
        <button
          className="self-end hover:cursor-pointer"
          onClick={handleOpenClick}
        >
          <X />
        </button>
        <Image
          src={guide}
          alt="Size Guide"
          width={150}
          height={150}
          className="self-center"
        />
      </div>
    </>
  );
}
