"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { removeItemFromCart, increaseQty } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InsertCart } from "@/libs/validators";
import { formatCurrency } from "@/libs/helper";

export default function ParallelCart({ cart }: { cart?: InsertCart }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const totalQty = cart?.items.reduce((a, c) => a + Number(c.qty), 0) ?? 0;

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16 text-center">
        <p className="text-sm text-muted-foreground">Your cart is empty</p>
        <Button className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity" onClick={() => redirect('/collections/all-products')}>
            Continue shopping
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* scrollable items */}
      <div className="flex-1 overflow-y-auto divide-y divide-border px-5">
        {cart.items.map((item) => (
          <div
            key={`${item.color}${item.qty}${item.size}${item.slug}`}
            className="flex gap-3 py-4"
          >
            {/* image */}
            <div className="w-15 h-15 shrink-0 rounded-lg border border-border overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            </div>

            {/* info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <div className="flex gap-2 text-xs text-muted-foreground mt-0.5">
                <span>{item.size}</span>
                <span>·</span>
                <span>{item.color}</span>
              </div>
              <p className="text-sm font-medium mt-1.5">
                {formatCurrency(Number(item.price))}
              </p>

              {/* qty controls */}
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      const res = await removeItemFromCart(
                        item.productId,
                        item.color,
                        item.size,
                      );
                      if (!res.success) console.log("did not work");
                    })
                  }
                >
                  {isPending ? (
                    <Loader className="size-3 animate-spin" />
                  ) : (
                    <Minus className="size-3" />
                  )}
                </Button>

                <span className="text-sm font-medium w-4 text-center">
                  {item.qty}
                </span>

                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      const res = await increaseQty(
                        item.productId,
                        item.size,
                        item.color,
                      );
                      if (!res.success) console.log("did not work");
                    })
                  }
                >
                  {isPending ? (
                    <Loader className="size-3 animate-spin" />
                  ) : (
                    <Plus className="size-3" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* sticky footer summary */}
      <div className="border-t border-border px-5 py-4 space-y-2 bg-background">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal ({totalQty} items)</span>
          <span className="text-foreground font-medium">
            {formatCurrency(Number(cart.itemsPrice))}
          </span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shipping</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>
        <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border">
          <span>Total</span>
          <span>{formatCurrency(Number(cart.totalPrice))}</span>
        </div>

        <Button
          className="w-full mt-1"
          disabled={isPending}
          onClick={() =>
            startTransition(() => router.push("/shipping-address"))
          }
        >
          {isPending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            <>
              Proceed to checkout
              <ArrowRight className="size-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </>
  );
}
