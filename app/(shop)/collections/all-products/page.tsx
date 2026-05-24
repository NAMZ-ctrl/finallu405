import { getLatestProducts } from "@/actions/products.actions";

export default async function AllProductsPage() {
  const allProducts = await getLatestProducts()
  console.log(allProducts);
  return (
    <>
      <div>all products in the webiste </div>
    </>
  );
}
