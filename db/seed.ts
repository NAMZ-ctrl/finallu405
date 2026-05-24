
import { prisma } from "./db";
import { sampleData } from "./data";

const main = async () => {
    await prisma.product.deleteMany();
    await prisma.product.createMany({
        data: sampleData.products,
    });
    console.log("Database seeded successfully.");
}

main()