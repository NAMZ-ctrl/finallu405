// app/shipping-address/page.tsx
import { auth } from "@/auth";
import { getMyCart } from "@/actions/cart.action";
import { GetUserById } from "@/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ShippingAddressForm from "./shipping-address";
import OrderSummary from "./order-summary";

export const metadata: Metadata = { title: "Checkout" };

export default async function CheckOutPage() {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");

  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("no user id");

  const user = await GetUserById(userId);

  return (
    <div className="min-h-screen grid md:grid-cols-[1fr_420px] lg:grid-cols-[1fr_480px]">
      {/* left — form */}
      <div className="px-6 md:px-12 lg:px-20 py-10 border-r border-border">
        <ShippingAddressForm/>
      </div>

      {/* right — order summary, sticky on desktop */}
      <div className="md:sticky md:top-0 md:h-screen md:overflow-y-auto order-first md:order-last">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
}