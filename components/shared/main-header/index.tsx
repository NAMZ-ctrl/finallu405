import { ShoppingCart } from "lucide-react";
import logo from "@/assets/405logo.png";
import Link from "next/link";
import type { NavLink } from "@/types/store";
import Nav from "@/components/header/nav";
import Image from "next/image";
import UserButton from "@/components/user-button";
import MobileMenu from "@/components/header/mobile-menu"
import { auth } from "@/auth";

const nav_links: NavLink[] = [
  { route: "Home", path: "/" },
  { route: "Shop", path: "/collections/all-products" },
];

export default async function Header() {
  const session = await auth();

  return (
    <header className="min-h-12 flex justify-between items-center py-3 px-4 sm:px-6">
      {/* mobile hamburger — hidden on sm and up */}
      <MobileMenu navLinks={nav_links} />

      {/* desktop nav — hidden on mobile */}
      <nav className="hidden sm:flex gap-4">
        {nav_links.map((nav, index) => (
          <Nav key={index} nav={nav} color="text-black" />
        ))}
      </nav>

      <Image src={logo} alt="logo" width={130} className="sm:w-37.5" />

      <div className="flex items-center gap-4">
        <Link href="/cart" className="hover:opacity-70 transition-opacity">
          <ShoppingCart size={22} />
        </Link>
        <UserButton session={session} />
      </div>
    </header>
  );
}