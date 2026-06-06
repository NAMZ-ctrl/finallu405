import ProductImage from "@/components/product/detailed-prod/product-image";
import ProductInfo from "@/components/product/detailed-prod/product-info";
import SizeGuide from "@/components/product/detailed-prod/size-guide";
import { useProduct } from "@/store/store";

import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ product: string }>;
}

export default async function ProductPage({ params }: Params) {
  const { product } = await params;
  const { singleProduct, loadProduct } = useProduct.getState();
  await loadProduct(product);
  if (!singleProduct) notFound();
  return (
    <>
      <section className="">
        <ProductImage
          images={singleProduct?.images}
          productName={singleProduct?.name || ""}
        />
        <ProductInfo />
        {/* <SizeGuide guide={singleProduct?.guide || ""} /> */}
      </section>
    </>
  );
}
