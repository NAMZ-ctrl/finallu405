import {getLatestProducts} from "@/actions/products.actions";
import EachProduct from "@/components/product/each-product";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function ProductsPage() {
  redirect("/collections/all-products");
}
