import type { NavLink } from "@/types/store";
import Link from "next/link";

export default function Nav(props: { nav: NavLink }) {
  return (
    <>
        <Link href={props.nav.path} className="text-white text-xl font-medium">{props.nav.route}</Link>
    </>
  );
}
