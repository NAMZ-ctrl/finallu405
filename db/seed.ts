
import { prisma } from "./db";
import { sampleData } from "./data";


const main = async () => {
  await prisma.size.deleteMany();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  for (const product of sampleData.products) {
    const { sizes, colors, ...productData } = product;
    await prisma.product.create({
      data: {
        ...productData,
        sizes: {
          create: sizes,
        },
        colors: {
          create: colors
        }
      },
    });
  }
  await prisma.user.createMany({data: sampleData.users})

  console.log("Database seeded successfully.");
};

main();
