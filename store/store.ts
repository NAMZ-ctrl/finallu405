import {create } from "zustand";
import { Product } from "@/app/generated/prisma/client";
import { getProductBySlug } from "@/actions/products.actions";

type Action = {
    singleProduct: Product,
    loadProduct: (product: string) => Promise<void>
}

export const useProduct = create<Action>((set) => ({
    singleProduct: {} as Product,
    loadProduct: async (product: string) => {
        const singleProduct = await getProductBySlug(product);
        return set({singleProduct: singleProduct as Product})
    }
}))