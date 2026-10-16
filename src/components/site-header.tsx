import Link from "next/link";
import { brand, navLinks } from "@/data/catalog";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-paper">
      <div className="container-page grid h-header grid-cols-[1fr_auto_1fr] items-center">
        {/* Mobile menu without JS: details/summary */}
        <details className="group lg:hidden">
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
                  <Link href={link.href} className="heading-2 block py-4">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex gap-8">
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
