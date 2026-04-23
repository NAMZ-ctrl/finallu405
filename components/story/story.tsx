import Image from "next/image";
import logo from  "@/assets/405logo.png"

export default function Story() {
  return (
    <>
      <section className="bg-black py-25">
        <div className="relative flex flex-col items-center">
            <Image src={logo} alt="logo" fill/>
            <a href="" className="bg-white text-red-400 p-3.5 uppercase rounded-2xl">Our story</a>
        </div>
      </section>
    </>
  );
}
