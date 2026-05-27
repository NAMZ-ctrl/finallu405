import { getLatestProducts } from "@/actions/products.actions";
import EachProduct from "@/components/product/each-product";

export default async function AllProductsPage() {
  const allProducts = await getLatestProducts()
  console.log(allProducts);
  return (
    <>
      <section className="grid max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,260px)] gap-4">
        {allProducts.map((product, index) => {
          return (<EachProduct key={index} product={product}/>)
        })}
      </section>
    </>
  );
}
