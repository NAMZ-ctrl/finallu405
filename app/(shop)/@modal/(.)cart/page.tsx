// app/@modal/(.)cart/page.tsx
import { getMyCart } from "@/actions/cart.action";
import CartDrawer from "@/components/parallel/cart-drawer";

export default async function CartModal() {
  const cart = await getMyCart();

  return (
    <>
      <CartDrawer cart={cart}/>
    </>
  );
}