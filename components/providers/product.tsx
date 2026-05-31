"use client";
import type { Product } from "@/app/generated/prisma/client";
import { useProductContext, ProductContext } from "@/context/ProductContext";

export default function ProductProvider({
  eachProduct,
  children,
}: {
  eachProduct: Product;
  children: React.ReactNode;
}) {
  return (
    <>
      <ProductContext.Provider value={eachProduct}>
        {children}
      </ProductContext.Provider>
    </>
  );
}
