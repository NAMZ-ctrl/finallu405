import type { ProductCreateInput } from "@/app/generated/prisma/models";
import type { Size } from "@/prisma/app/generated/prisma/client";
import { prisma } from "./db";
import { sampleData } from "./data";
import { size } from "zod";

const main = async () => {
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

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
  await prisma.user.createMany({data: sampleData.users})

  console.log("Database seeded successfully.");
};

main();
