"use client";

import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { NavLink } from "@/types/store";

export default function MobileMenu({ navLinks }: { navLinks: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle menu"
        className="flex items-center justify-center"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />

          {/* slide-down panel */}
          <div className="fixed top-15 left-0 right-0 bg-background border-b border-border z-50 px-4 py-3">
            {navLinks.map((nav, index) => (
              <Link
                key={index}
                href={nav.path}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-3 text-base font-medium border-b border-border last:border-b-0"
              >
                {nav.route}
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}