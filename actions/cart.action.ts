"use server";

import { cookies } from "next/headers";
import { size, success, z } from "zod";
import { Cart, CartError, cartSchema, insertCartSchema } from "@/libs/validators";
import { auth } from "@/auth";
import { prisma } from "@/db/db";
import { round2 } from "@/libs/helper";
import { revalidatePath } from "next/cache";


interface PrevState{
  errors?: CartError,
  message?: string,
  success?: boolean
}
const calcPrice = (items: Cart[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0),
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: Number(itemsPrice.toFixed(2)),
    shippingPrice: Number(shippingPrice.toFixed(2)),
    taxPrice: Number(taxPrice.toFixed(2)),
    totalPrice: Number(totalPrice.toFixed(2)),
  };
};
export async function addToCart(prevState: PrevState , formData: FormData): Promise<PrevState> {
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
    // worrking on getting the item
    const userProductData = Object.fromEntries(formData);
    console.log('user product data', userProductData)
    const item = cartSchema.safeParse(userProductData);
    console.log('item is', item);
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
      if (!newCart.success) {
        const errors = z.flattenError(newCart.error).fieldErrors;
        console.log(errors);
        return { errors };
      }

      console.log("cart data", newCart.data);
      // add to database
      await prisma.cart.create({
        data: newCart.data!,
      });

      // get the size

      // revlidate product page
      revalidatePath(`products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} added to cart`,
      };
    } else {
      const existItem = (cart.items as Cart[]).find(
        (x) => x.productId === item.data.productId,
      );
      if (existItem) {
        const size = await prisma.size.findFirst({
          where: {
            product_id: item.data.slug,
            name: item.data.size,
          },
        });
        // check stock
        if (size?.quantity! < existItem.qty + 1) {
          throw new Error("Not enough stock");
        }
        // increase the quantity
        (cart.items as Cart[]).find(
          (x) => x.productId === item.data.productId,
        )!.qty = existItem.qty + 1;
      } else {
        const size = await prisma.size.findFirst({
          where: {
            product_id: item.data.slug,
            name: item.data.size,
          },
        });
        // if the item does not exist in cart
        // check stock
        if (size?.quantity! < 1) throw new Error("Not enough stock");

        // add items to cart
        cart.items.push(item.data);
      }

      // save to database
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: cart.items,
          ...calcPrice(cart.items),
        },
      });

      revalidatePath(`products/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${existItem ? "updated In" : "added to"} cart`,
      };
    }
  } catch (error) {
    console.log(error);
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

export async function removeItemFromCart(productId: string) {
  try {
    // check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("cart session not found");

    // Get product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error("product not found");

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    // check for item
    const exist = (cart.items as Cart[]).find((x) => x.productId === productId);
    if (!exist) throw new Error("Item not found");

    // if only one qunatity
    if (exist.qty === 1) {
      // remove from cart
      cart.items = (cart.items as Cart[]).filter(
        (x) => x.productId !== exist.productId,
      );
    } else {
      // DECREASE QTY
      (cart.items as Cart[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items,
        ...calcPrice(cart.items),
      },
    });

    revalidatePath(`/products/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`
    }
  } catch (error) {
    return {
      success: false,
      message: "issue",
    };
  }
}
