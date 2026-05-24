import { Product } from "@/app/generated/prisma/client";
import { ProductShape } from "@/types/store";
import Image from "next/image";
import Link from "next/link";

export default function EachProduct({ product }: { product: ProductShape }) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="flex flex-col gap-3">
        <div className="relative size-62.5">
          <Image src={product.images[1]} fill alt={product.name} />
        </div>
        <div className="font-bold">{product.name}</div>
        <div>{product.price}</div>
      </div>
    </Link>
  );
}
