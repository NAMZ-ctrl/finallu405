// "use client";

import { ShoppingBagIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/store/store";


export default function ProductInfo() {
//   const [number, setNumber] = useState(0);
  const product = useProduct.getState().singleProduct;
  return (
    <>
      <div>
        <div className="grid-rows-2 gap-3">
          <h1 className="text-4xl font-extrabold uppercase">{product?.name}</h1>
          <p className="font-bold text-black text-xl">{product?.price}</p>
        </div>
        <div>
          <span>Size</span>
        </div>
        <div className="grid">
          <div className="grid grid-cols-[auto_0.5fr] gap-4">
            {/* <div>
              <Button onClick={() => setNumber(prev => prev + 1)}>+</Button>
              <input type="text" value={number} onChange={(e) => setNumber(parseInt(e.target.value) || 0)} />
              <Button onClick={() => setNumber(prev => prev - 1)}>-</Button>
            </div> */}
            <Button>
              <ShoppingBagIcon />
              <span>Add to cart</span>
            </Button>
          </div>
          <Button>Buy it Now</Button>
        </div>
      </div>
    </>
  );
}
