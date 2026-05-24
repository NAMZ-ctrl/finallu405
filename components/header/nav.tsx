'use client';

import type { NavLink } from "@/types/store";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Nav(props: { nav: NavLink, color?: string }) {
  const pathname = usePathname();
  const isActive = pathname === props.nav.path;
  return (
    <>
        <Link href={props.nav.path} className={`${isActive ? 'text-red-500' : props.color || 'text-white'} text-xl font-medium`}>{props.nav.route}</Link>
    </>
  );
}
