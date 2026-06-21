import {create } from "zustand";
import { getColorsBySlug, getProductBySlug, getSizesBySlug } from "@/actions/products.actions";
import { Size, Color, Product } from "@/prisma/app/generated/prisma/client";
type Action = {
    singleProduct: Product,
    colors: Color[],
    loadProduct: (product: string) => Promise<void>,
    loadColors: (slug: string) => Promise<void>
}

export const useProduct = create<Action>((set) => ({
    singleProduct: {} as Product,
    colors: [],
    loadProduct: async (product: string) => {
        const singleProduct = await getProductBySlug(product);
        return set({singleProduct: singleProduct as Product})
    },
    loadColors: async (slug: string) => {
        const colors = await getColorsBySlug(slug)
        return set({colors: colors as Color[]})
    }

}))