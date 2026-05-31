import Header from "@/components/shared/main-header";
import ProductFooter from "@/components/shared/prouct-footer/product-footer";
import { ProductContext } from "@/context/ProductContext";
import React from "react";

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh min-w-[min(1350px,calc(100%-1rem))] mx-auto">
          <Header />
          <main>{children}</main>
          <ProductFooter />
        </div>
    </>
  );
}
