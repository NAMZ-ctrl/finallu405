import { splitDescription } from "@/libs/helper";
import { useProduct } from "@/store/store";

export default function Description() {
  const product = useProduct.getState().singleProduct;
  const description = splitDescription(product?.description);
  return (
    <>
      <ul className="list-disc p-2">
        {description.map((desc, index) => {
          return <li key={index}>{desc}</li>;
        })}
      </ul>
    </>
  );
}
