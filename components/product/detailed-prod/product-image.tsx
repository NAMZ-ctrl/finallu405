import { useProduct } from "@/store/store"
import Image from "next/image"

export default function ProductImage(){
    const product = useProduct.getState().singleProduct
    return (
        <>
            <div className="relative w-full">
               <Image src={product?.images[0]} alt={`${product?.name} image`} fill/>
            </div>
        </>
    )
}