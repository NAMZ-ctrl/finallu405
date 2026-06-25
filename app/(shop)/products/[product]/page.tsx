import ProductImage from "@/components/product/images-comp/product-image";
import ProductInfo from "@/components/product/detailed-prod/product-info";
import { notFound } from "next/navigation";
import { getColorsBySlug, getSizesBySlug, getProductBySlug } from "@/actions/products.actions";

interface Params {
  params: Promise<{ product: string }>;
}

export default async function ProductPage({ params }: Params) {
  const { product: slug } = await params;

 
  const [singleProduct, sizes, colors] = await Promise.all([
    getProductBySlug(slug),
    getSizesBySlug(slug),
    getColorsBySlug(slug),
  ]);

  if (!singleProduct) notFound();

  return (
    <section className="grid md:grid-cols-[1fr_0.6fr] gap-8 lg:gap-12 px-4 md:px-8 lg:px-12 py-6 min-h-screen">
      <ProductImage images={singleProduct.images} productName={singleProduct.name} />
      <ProductInfo product={singleProduct} sizes={sizes} colors={colors} />
    </section>
  );
}