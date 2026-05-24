import { getProductBySlug } from "@/actions/products.actions";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ product: string }>;
}

export default async function ProductPage({ params }: Params) {
  const {product} = await params;
  const singleProduct = await getProductBySlug(product);
  console.log(singleProduct);
  if (!singleProduct) notFound()
  return (
    <>
      <div>{product}</div>
    </>
  );
}
