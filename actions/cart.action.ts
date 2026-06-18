"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import { Cart, cartSchema, insertCartSchema } from "@/libs/validators";
import { auth } from "@/auth";
import { prisma } from "@/db/db";
import { round2 } from "@/libs/helper";
import { revalidatePath } from "next/cache";

const calcPrice = (items: Cart[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
export async function addToCart(data: Cart) {
  try {
    // check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("cart session not found");

    // get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // get cart
    const cart = await getMyCart();

    // parse and validate item

    const item = cartSchema.safeParse(data);
    if (!item.success) {
      const errors = z.flattenError(item.error).fieldErrors;
      return { errors, message: "something went wrong" };
    }

    // find product in the database
    const product = await prisma.product.findFirst({
      where: { id: item.data.productId },
    });
    if (!product) throw new Error("Product not found");
    if (!cart) {
      const newCart = insertCartSchema.safeParse({
        userId: userId,
        items: [item.data],
        sessionCartId: sessionCartId,
        ...calcPrice([item.data]),
      });

      // add to database
      await prisma.cart.create({
        data: newCart.data,
      });

      // revlidate product page
      revalidatePath(`products/${product.slug}`);
    }

    return {
      success: true,
      message: "item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: "not added to cart",
    };
  }
}

export async function getMyCart() {
  // check for cart cookie
  const sessionCartId = (await cookies()).get("sessionCartId")?.value;
  if (!sessionCartId) throw new Error("cart session not found");

  // get session and user ID
  const session = await auth();
  const userId = session?.user?.id ? (session.user.id as string) : undefined;

  // get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;
  return {
    ...cart,
    items: cart.items as Cart[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  };
}
