"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { removeItemFromCart, increaseQty } from "@/actions/cart.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Loader, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { InsertCart } from "@/libs/validators";
import { formatCurrency } from "@/libs/helper";

interface CartProps {
  cart?: InsertCart;
}

export default function CartTable({ cart }: CartProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <p className="text-muted-foreground text-lg">Your cart is empty</p>
        <Link
          href="/"
          className="text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  const totalQty = cart.items.reduce((a, c) => a + Number(c.qty), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* heading */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Your cart</h1>
        <span className="text-sm text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
          {totalQty} {totalQty === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start">
        {/* items list */}
        <div className="divide-y divide-border">
          {cart.items.map((item) => (
            <div key={`${item.slug}${item.size}${item.color}`} className="flex gap-4 py-5">
              {/* image */}
              <Link href={`/products/${item.slug}`} className="shrink-0">
                <div className="w-20 h-20 rounded-lg border border-border overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>

              {/* info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.slug}`}
                  className="font-medium text-sm hover:underline underline-offset-2 line-clamp-1"
                >
                  {item.name}
                </Link>
                <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                  <span>Size: {item.size}</span>
                  <span>Color: {item.color}</span>
                </div>
                <p className="text-sm font-medium mt-2">
                  {formatCurrency(Number(item.price))}
                </p>

                {/* qty controls */}
                <div className="flex items-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        await removeItemFromCart(item.productId);
                      })
                    }
                  >
                    {isPending ? (
                      <Loader className="size-3 animate-spin" />
                    ) : (
                      <Minus className="size-3" />
                    )}
                  </Button>

                  <span className="w-6 text-center text-sm font-medium">
                    {item.qty}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        await increaseQty(item.productId, item.size, item.color);
                      })
                    }
                  >
                    {isPending ? (
                      <Loader className="size-3 animate-spin" />
                    ) : (
                      <Plus className="size-3" />
                    )}
                  </Button>

                  {/* remove entirely */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-auto text-muted-foreground hover:text-destructive"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        await removeItemFromCart(item.productId);
                      })
                    }
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* order summary */}
        <Card className="sticky top-4">
          <CardContent className="p-5 space-y-3">
            <h2 className="font-semibold text-base">Order summary</h2>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal ({totalQty} items)</span>
                <span className="text-foreground font-medium">
                  {formatCurrency(Number(cart.itemsPrice))}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-sm pt-3 border-t border-border">
              <span>Total</span>
              <span>{formatCurrency(Number(cart.totalPrice))}</span>
            </div>

            <Button
              className="w-full mt-2"
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}