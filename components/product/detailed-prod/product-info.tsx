"use client"

import { Button } from "@/components/ui/button";
import SizeContainer from "./sizes-comp";
import IncreDecre from "./incre-decre";
import Description from "./description";
import AddToCart from "@/components/product/add-to-cart";
import { addToCart } from "@/actions/cart.action";
import { useActionState } from "react";
import { Product } from "@/app/generated/prisma/client";
import { Color, Size } from "@/prisma/app/generated/prisma/client";
import ColorContainer from "./color-comp";
import { buyNow } from "@/actions/buy.action";

interface ProductProp{
  product: Product,
  sizes: Size[],
  colors: Color[]
}
export default function ProductInfo({product, sizes, colors}: ProductProp) {

  const [state, action, isPending] = useActionState(addToCart, {})
  return (
    <>
      <div className="grid gap-3 h-fit max-md:mt-4 max-md:px-2">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold tracking-wide text-3xl uppercase p-0">
            {product?.name}
          </h1>
          <div className="font-medium text-xl">
            <span>&#x20A6;</span>
            {product?.price}NGN
          </div>
        </div>
        <form action={action} className="grid gap-3">
          <input type="text" className="hidden" name="productId" defaultValue={product.id}/>
          <input type="text" className="hidden" name="name" defaultValue={product.name}/>
          <input type="text" className="hidden" name="slug" defaultValue={product.slug}/>
          <input type="text" className="hidden" name="image" defaultValue={product.images[0]}/>
          <input type="text" className="hidden" name="price" defaultValue={Number(product.price)}/>
          <SizeContainer sizes={sizes} />
          <ColorContainer colors={colors}/>
          <div className="grid items-center gap-3">
            <div className="grid grid-cols-[1fr_3fr] gap-4">
              <IncreDecre />
              <AddToCart/>
            </div>
            <Button className="h-13 hover:cursor-pointer hover:opacity-80">
              Buy it Now
            </Button>
          </div>
        </form>
        <Description description={product.description}/>
      </div>
    </>
  );
}
