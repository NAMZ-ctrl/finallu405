import Header from "@/components/shared/main-header";
import ProductFooter from "@/components/shared/prouct-footer/product-footer";
import React from "react";

export default function ShopLayout({
  children,
  modal
}: Readonly<{ children: React.ReactNode, modal: React.ReactNode }>) {
  return (
    <>
        <div className="grid grid-rows-[auto_1fr_auto] min-h-dvh max-sm:w-full sm:min-w-[min(1350px,calc(100%-1rem))] mx-auto ">
          <Header />
          <main>{children}</main>
          {modal}
          <ProductFooter />
        </div>
    </>
  );
}
