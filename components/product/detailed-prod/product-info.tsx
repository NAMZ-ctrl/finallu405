// "use client";

import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/store/store";
import SizeContainer from "./sizes-comp";
import IncreDecre from "./incre-decre";
import Description from "./description";
import AddToCart from "@/components/product/add-to-cart";
import { Cart } from "@/libs/validators";


export default function ProductInfo() {
  //   const [number, setNumber] = useState(0);
  const product = useProduct.getState().singleProduct;
  console.log('product info', product)
  const productCart: Cart = {
    productId: product.id,
    name: product.name,
    slug: product.slug,
    image: product.images[0]!,
    qty: 1,
    currency: product.price
  }
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
          <SizeContainer />
          <div className="grid items-center gap-3">
            <div className="grid grid-cols-[1fr_3fr] gap-4">
              <IncreDecre />
              <AddToCart item={productCart}/>
            </div>
            <Button className="h-13 hover:cursor-pointer hover:opacity-80">
              Buy it Now
            </Button>
          </div>
          <Description />
      </div>
    </>
  );
}
