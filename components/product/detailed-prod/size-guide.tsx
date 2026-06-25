"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useModal } from "@/store/modalStore";
import { ProductGuideProps } from "@/types/store";

export default function SizeGuide({ guide }: ProductGuideProps) {
  const { open, handleOpenClick } = useModal(); // ← hook, not .getState()

  if (!open) return null;

  return (
    <>
      {/* backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={handleOpenClick}
      />

      {/* modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-2xl p-6 w-[90vw] max-w-md shadow-lg flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg uppercase tracking-wide">
            Size Guide
          </h2>
          <button
            onClick={handleOpenClick}
            className="hover:opacity-70 transition-opacity"
            aria-label="Close size guide"
          >
            <X className="size-5" />
          </button>
        </div>

        <Image
          src={guide}
          alt="Size Guide"
          width={500}
          height={500}
          className="w-full h-auto object-contain rounded-lg"
        />
      </div>
    </>
  );
}
