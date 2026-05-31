import instagram from "@/assets/socials/instagram.png"
import tiktok from "@/assets/socials/tik-tok.png"
import Image, { StaticImageData} from "next/image";

interface Logo{
    social: StaticImageData,
    link: string
}


export default function Footer() {
    console.log('the footer side')
    const socials: Logo[] = [
        {
            social: instagram,
            link: "https://www.instagram.com/405.rewritetheworld?igsh=MWNybzg3eHpvdHBlcw=="
        },
        {
            social: tiktok,
            link: "https://www.tiktok.com/@405.rtw?_r=1&_t=ZS-94lvlqQQ6Dw"
        }
    ]

  return (
    <>
      <footer className="py-20 bg-white">
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-xl uppercase tracking-wider font-medium text-black">Contact Us</h3>
          <div className="flex gap-8 mt-3">
                {socials.map((each, index) => <a href={each['link']} className="hover:cursor-pointer" target="__blank" key={index}>
                    <Image src={each['social']} alt="" className="size-8"/>
                </a>)}
          </div>
        </div>
      </footer>
    </>
  );
}
