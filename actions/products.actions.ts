"use server";

import { prisma } from "@/db/db";


export async function getLatestProducts(){
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

export async function getSizesBySlug(slug: string) {
  const size = await prisma.size.findMany({
    where: {
      product_id: slug
    }
  })
  return size;
}

export async function getColorsBySlug(slug: string){
  const colors = await prisma.color.findMany({
    where: {
      product_id: slug
    }
  })
  return colors
}

