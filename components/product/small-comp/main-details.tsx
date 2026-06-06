import { useProductContext } from "@/context/ProductContext"

export default function MainDetails(){
    const product = useProductContext();
    return (
        <>
            <div className="grid-rows-3">
                <h1>{product?.name}</h1>
                <p>{product?.description}</p>
                <p>{product?.price?.toString()}</p>
            </div>
        </>
    )
}