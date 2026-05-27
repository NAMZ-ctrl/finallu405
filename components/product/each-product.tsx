"use client";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { ProductShape } from "@/types/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function EachProduct({ product }: { product: ProductShape }) {
  const [imageNum, setImageNum] = useState(0)

  const changeImage = () => {
    setImageNum((prev) => (prev + 1) % product.images.length)
    console.log('changed image', imageNum)
  }

  const setInitialImage = () => {
    setImageNum(0);
    console.log('initial image', imageNum)
  }

  return (
    <Link href={`/products/${product.slug}`} className="hover:scale-[1.1]" onMouseOver={changeImage} onMouseOut={setInitialImage}>
      <Card className="border-none">
        <CardHeader>
            <Image
              src={product.images[imageNum]}
              alt={product.name}
              width={260}
              height={260}
            />
          <CardTitle className="font-semibold text-md">
            {product.name}
          </CardTitle>
          <CardDescription className="font-bold text-black">
            {product.price}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
