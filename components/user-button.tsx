"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Package, User } from "lucide-react";
import Link from "next/link";
import type { Session } from "next-auth";
import { signOutUser } from "@/actions/user.action";

export default function UserButton({ session }: { session: Session | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (!session?.user) {
    return (
      <Link
        href="/sign-in"
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors"
      >
        <User className="size-3.5" />
        Sign in
      </Link>
    );
  }

  const firstName = session.user.name?.split(" ")[0] ?? "Account";
  const initial = firstName.charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-border hover:bg-muted transition-colors"
      >
        <div className="w-6 h-6 rounded-full bg-foreground text-background text-[11px] font-semibold flex items-center justify-center">
          {initial}
        </div>
        <span className="text-sm font-medium">{firstName}</span>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-background shadow-lg overflow-hidden z-50">
          <div className="px-3.5 py-3 border-b border-border">
            <p className="text-sm font-medium truncate">{session.user.name}</p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {session.user.email}
            </p>
          </div>

          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm hover:bg-muted transition-colors"
          >
            <Package className="size-4" />
            My orders
          </Link>

          <div className="h-px bg-border my-0.5" />

          <form action={signOutUser}>
            <button
              type="submit"
              className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}