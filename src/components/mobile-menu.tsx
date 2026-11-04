"use client";

import Link from "next/link";
import { useRef } from "react";
import { navLinks } from "@/data/catalog";
import { CloseIcon, MenuIcon } from "./icons";

/* details/summary keeps the menu working before JS loads. Client navigation
 * keeps the layout mounted, so a link click has to close it explicitly. */
export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (menu.current) menu.current.open = false;
  };

  return (
    <details ref={menu} className="group xl:hidden">
      <summary
        className="btn-icon -ml-3 list-none [&::-webkit-details-marker]:hidden"
        aria-label="Menu"
      >
        <span className="group-open:hidden">
          <MenuIcon />
        </span>
        <span className="hidden group-open:block">
          <CloseIcon />
        </span>
      </summary>
      <nav
        aria-label="Main"
        className="absolute inset-x-0 top-full h-[calc(100svh-var(--header-height))] overflow-y-auto border-t bg-paper px-gutter py-8"
      >
        <ul className="divide-hairline">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={close}
                className="heading-2 block py-4"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
