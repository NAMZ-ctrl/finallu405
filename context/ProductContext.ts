'use client';

import { createContext, useContext } from "react";
import type { Product } from "@/app/generated/prisma/client";

export const ProductContext = createContext<Product | null>(null);

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) return null;
    return context;
}
