
"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import ParallelCart from "./parallel-cart";
import { InsertCart } from "@/libs/validators";

export default function CartDrawer({ cart }: { cart?: InsertCart }) {
  const router = useRouter();

  return (
    <>
      {/* backdrop — click to close */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => router.back()}
      />

      {/* drawer */}
      <div className="fixed top-0 right-0 h-dvh w-full sm:w-100 bg-background z-50 shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg">Cart</h3>
            <span className="text-muted-foreground">({cart?.items.length ?? 0})</span>
          </div>
          {/* X button to close */}
          <button
            onClick={() => router.back()}
            className="hover:opacity-70 transition-opacity"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-4">
          <ParallelCart cart={cart} />
        </div>
      </div>
    </>
  );
}