import type { Product } from "@/app/generated/prisma/client";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailedProductProps {
  product: Product;
}

export default function DetailedProduct({ product }: DetailedProductProps) {
  return (
    <>
      <div></div>
      <div className="">
        <h1 className="uppercase">{product.name}</h1>
        <h3>{product.price}</h3>
        <div>
          <div>size guide</div>
          <span>size</span>
          <div>sizes options</div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-[1fr,2fr] gap-4">
            <div className="flex justify-between">
              <Button asChild>-</Button>
              <span>quantity</span>
              <Button asChild>+</Button>
            </div>
            <Button className="uppercase flex justify-center">
              <div className="flex gap-2 items-center">
                <ShoppingBasket color="#fff" />
                <span className="uppercase text-white">ADD TO CART</span>
              </div>
            </Button>
          </div>
          <div>
            <Button className="text-white">BUY IT NOW</Button>
          </div>
        </div>
      </div>
    </>
  );
}
