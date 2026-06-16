import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight} from "lucide-react";
import { useProduct } from "@/store/store";

export default async function SizeContainer() {
  const product = useProduct.getState().singleProduct;
  const getSizes = useProduct.getState().loadSizes;
  await getSizes(product?.slug);
  const sizes = useProduct.getState().sizes;
  return (
    <>
      <div className="grid gap-4">
        <button className="font-bold flex gap-1 items-center bg-white text-black">
          <span className="uppercase">Size Guide</span>
          <SquareArrowOutUpRight size={15} className="font-bold"/>
        </button>
        <div className="grid gap-3">
          <span className="font-bold">Size</span>
          <div className="flex md:justify-start flex-wrap gap-y-2 max-md:justify-between">
            {sizes.map((size, index) => {
              return (
                <label
                  htmlFor=""
                  className="border-gray-200 border-2 w-14 h-10 rounded-2xl flex items-center justify-center p-2 hover:cursor-pointer mr-3"
                  key={index}
                >
                  <input type="radio" className="hidden" />
                  <span className="font-bold">{size.name}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
