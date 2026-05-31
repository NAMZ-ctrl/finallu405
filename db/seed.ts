import type { ProductCreateInput } from "@/app/generated/prisma/models";
import type { Size } from "@/prisma/app/generated/prisma/client";
import { prisma } from "./db";
import { sampleData } from "./data";

const main = async () => {
  await prisma.product.deleteMany();
  for (const product of sampleData.products) {
    const { sizes, ...productData } = product;
    await prisma.product.create({
      data: {
        ...productData,
        sizes: {
          create: sizes,
        },
      },
    });
  }

  console.log("Database seeded successfully.");
};

main();
