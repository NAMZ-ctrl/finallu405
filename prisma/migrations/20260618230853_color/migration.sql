-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_product_id_fkey";

-- CreateTable
CREATE TABLE "Color" (
    "id" SERIAL NOT NULL,
    "product_id" TEXT NOT NULL,
    "hexCode" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "image" TEXT[],

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Color" ADD CONSTRAINT "Color_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("slug") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
