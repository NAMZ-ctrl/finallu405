import { splitDescription } from "@/libs/helper";
import { useProduct } from "@/store/store";

export default function Description({description}: {description: string}) {
  const splittedDescription = splitDescription(description);
  return (
    <>
      <ul className="list-disc p-2">
        {splittedDescription.map((desc, index) => {
          return <li key={index}>{desc}</li>;
        })}
      </ul>
    </>
  );
}
