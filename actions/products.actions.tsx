"use server";

import { prisma } from "@/db/db";

export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

// get single product by slug
export async function getProductBySlug(slug: string) {
  const data = await prisma.product.findFirst({
    where: {
      slug: slug,
    },
  })
  return data;
}
