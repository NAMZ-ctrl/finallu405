"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBagIcon } from "lucide-react";

export default function AddToCart({ isPending }: { isPending: boolean }) {
  return (
    <Button
      className="h-13 rounded-2xl hover:cursor-pointer hover:opacity-80"
      type="submit"
      disabled={isPending}
    >
      <ShoppingBagIcon />
      <span>{isPending ? "Adding..." : "Add to cart"}</span>
    </Button>
  );
}