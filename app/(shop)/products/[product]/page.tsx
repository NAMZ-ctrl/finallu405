import { getProductBySlug } from "@/actions/products.actions";
import ProductImage from "@/components/product/detailed-prod/product-image";
import ProductInfo from "@/components/product/detailed-prod/product-info";
import { useProduct } from "@/store/store";

import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ product: string }>;
}

export default async function ProductPage({ params }: Params) {
  const { product } = await params;
  const singleProduct = useProduct.getState().singleProduct
  const loadProduct = useProduct.getState().loadProduct
  await loadProduct(product);
  console.log(singleProduct);
  if (!singleProduct) notFound();
  return (
    <>
        <section className="grid grid-cols-[2fr_1fr] ">
          <div>
            <ProductImage/>
          </div>
          <div>
            <ProductInfo/>
          </div>
        </section>
    </>
  );
}
