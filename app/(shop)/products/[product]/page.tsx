import ProductImage from "@/components/product/images-comp/product-image";
import ProductInfo from "@/components/product/detailed-prod/product-info";
import SizeGuide from "@/components/product/detailed-prod/size-guide";
import { useProduct } from "@/store/store";

import { notFound } from "next/navigation";
import { getColorsBySlug, getSizesBySlug } from "@/actions/products.actions";

interface Params {
  params: Promise<{ product: string }>;
}

export default async function ProductPage({ params }: Params) {
  const { product } = await params;
  const { singleProduct, loadProduct } = useProduct.getState();
  await loadProduct(product);
  const sizes = await getSizesBySlug(singleProduct.slug);
  const colors = await getColorsBySlug(singleProduct.slug);

  if (!singleProduct) notFound();
  return (
    <>
      <section className="grid md:grid-cols-[1fr_0.5fr]">
        <ProductImage
          images={singleProduct?.images}
          productName={singleProduct?.name || ""}
        />
        <ProductInfo product={singleProduct} sizes={sizes} colors={colors} />
      </section>
    </>
  );
}
