"use client";

import { Cart } from "@/libs/validators";
import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";
import { Plus, ShoppingBagIcon } from "lucide-react";
import { toast } from "sonner";
import { addToCart } from "@/actions/cart.action";

interface AddToCartType {
  item: Cart;
}

export default function AddToCart({ item }: AddToCartType) {
  const addItemToCart = async () => {
    const res = await addToCart(item);
    if (!res.success) {
      toast.error(res.message);
    }
    toast.success(res.message);
  };

  return (
    <>
      <Button
        className="h-13 rounded-2xl hover:cursor-pointer hover:opacity-80"
        type="button"
        onClick={addItemToCart}
      >
        <ShoppingBagIcon />
        <span>Add to cart</span>
      </Button>
    </>
  );
}
