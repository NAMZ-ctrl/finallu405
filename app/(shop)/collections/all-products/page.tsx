import { getLatestProducts } from "@/actions/products.actions";
import EachProduct from "@/components/product/each-product";

export default async function AllProductsPage() {
  const allProducts = await getLatestProducts();

  return (
    <section className="px-4 py-8 max-w-screen-xl mx-auto">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-xl font-semibold tracking-tight">All products</h1>
        <span className="text-sm text-muted-foreground">
          {allProducts.length} {allProducts.length === 1 ? "product" : "products"}
        </span>
      </div>

      <div className="flex flex-wrap gap-4">
        {allProducts.map((product) => (
          <EachProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}