import { ShoppingCart } from "lucide-react";
import logo from "@/assets/405logo.png";
import type { NavLink } from "@/types/store";
import Nav from "@/components/header/nav";
import Image from "next/image";

const nav_links: NavLink[] = [
  {
    route: "Home",
    path: "/",
  },
  {
    route: "Shop",
    path: "/collections/all-products",
  },
];

export default function Header() {
  return (
    <>
      <header className="min-h-12 flex justify-between items-center py-3">
        <nav className="flex gap-4">
          {nav_links.map((nav, index) => (
            <Nav key={index} nav={nav} color={`text-black`} />
          ))}
        </nav>
       <Image src={logo} alt="logo" width={150} />
        <div>
            <ShoppingCart size={24} color="#000"/>
        </div>
      </header>
    </>
  );
}
