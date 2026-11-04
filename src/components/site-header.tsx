import Link from "next/link";
import { brand, navLinks } from "@/data/catalog";
import { BagIcon, HeartIcon, SearchIcon } from "./icons";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-paper">
      <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
        <MobileMenu />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="eyebrow link-quiet">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/"
          className="font-serif text-xl uppercase tracking-[0.3em] lg:text-2xl"
        >
          {brand}
        </Link>

        <div className="-mr-3 flex items-center justify-end">
          <button className="btn-icon" aria-label="Search">
            <SearchIcon />
          </button>
          <button
            className="btn-icon hidden sm:inline-flex"
            aria-label="Wishlist"
          >
            <HeartIcon />
          </button>
          <button className="btn-icon" aria-label="Bag, 0 items">
            <BagIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
