'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { MobileImages } from "@/libs/helper";
import logo from "@/assets/405logo.png"
import Header from "./header/header";
import Link from "next/link";

export default function Hero() {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % MobileImages.length);
    }, 2000);
    console.log(index);
    return () => clearInterval(interval);
  });

  return (
    <>
      <section className="w-full h-dvh relative flex flex-col">
        <Header />
        <Image
          src={MobileImages[index]}
          alt={`images${index}`}
          className="object-cover w-full h-full absolute z-1 animate-fadein"
        />
        <div className="absolute z-2 text-white text-5xl w-full text-center top-1/2 left-1/2 -translate-x-1/2">
            <Link className="uppercase text-white border border-white p-3 text-lg font-bold rounded-lg" href={'/shop'}>our store</Link>
        </div>
        <div className="absolute">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff"
            className=""
          >
            <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
          </svg>
        </div>
      </section>
    </>
  );
}
