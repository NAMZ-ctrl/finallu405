import { Metadata } from "next";
import CartTable from "./cart-table";
import { getMyCart } from "@/actions/cart.action";
import { InsertCart } from "@/libs/validators";

export const metadata: Metadata = {
    title: 'cart'
}

export default async function CartPage() {
    const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart}/>
    </>
  );
}
