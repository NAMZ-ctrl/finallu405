-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_product_id_fkey";

-- AddForeignKey
ALTER TABLE "Size" ADD CONSTRAINT "Size_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
