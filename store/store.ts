import {create } from "zustand";
import { Product } from "@/app/generated/prisma/client";
import { getProductBySlug, getSizesBySlug } from "@/actions/products.actions";
import { Size } from "@/prisma/app/generated/prisma/client";

type Action = {
    singleProduct: Product,
    sizes: Size[],
    loadProduct: (product: string) => Promise<void>,
    loadSizes: (slug: string) => Promise<void>,
    
}

export const useProduct = create<Action>((set) => ({
    singleProduct: {} as Product,
    sizes: [],
    loadProduct: async (product: string) => {
        const singleProduct = await getProductBySlug(product);
        return set({singleProduct: singleProduct as Product})
    },
    loadSizes: async (slug: string) => {
        const sizes = await getSizesBySlug(slug);
        return set({sizes: sizes})
    }
}))