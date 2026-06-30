// components/checkout/order-summary.tsx
import Image from "next/image";
import { CircleHelp } from "lucide-react";
import { formatCurrency } from "@/libs/helper";
import { InsertCart } from "@/libs/validators";

export default function OrderSummary({ cart }: { cart: InsertCart }) {
  return (
    <div className="bg-muted/40 border-l border-border px-8 py-10 min-h-full">
      {/* items */}
      <div className="space-y-4 mb-6">
        {cart.items.map((item) => (
          <div key={item.slug} className="flex items-start gap-3">
            {/* image with qty badge */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-lg border border-border overflow-hidden bg-background">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                {item.qty}
              </span>
            </div>

            {/* name + variant */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug">{item.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {item.size}
                {item.color ? ` · ${item.color}` : ""}
              </p>
            </div>

            {/* price */}
            <span className="text-sm font-medium shrink-0">
              {formatCurrency(Number(item.price) * Number(item.qty))}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-foreground font-medium">
            {formatCurrency(Number(cart.itemsPrice))}
          </span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            Shipping
            <CircleHelp className="size-3.5" />
          </span>
          <span className="text-foreground font-medium">
            {formatCurrency(Number(cart.shippingPrice))}
          </span>
        </div>
      </div>

      <div className="border-t border-border mt-4 pt-4 flex justify-between items-baseline">
        <span className="font-medium">Total</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-muted-foreground">NGN</span>
          <span className="text-lg font-semibold">
            {formatCurrency(Number(cart.totalPrice))}
          </span>
        </div>
      </div>
    </div>
  );
}