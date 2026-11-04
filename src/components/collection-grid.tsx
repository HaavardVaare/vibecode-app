import Link from "next/link";
import { CategoryTile } from "./category-tile";
import { collections } from "@/data/catalog";

export function CollectionGrid() {
  return (
    <section
      id="collections"
      className="section container-page scroll-mt-header"
    >
      <header className="mb-8 flex items-end justify-between gap-6 lg:mb-12">
        <h2 className="heading-1">Shop by category</h2>
        <Link href="/categories" className="eyebrow link hidden sm:inline">
          View all
        </Link>
      </header>
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
        {collections.map((c) => (
          <li key={c.slug}>
            <CategoryTile
              href={`#${c.slug}`}
              image={c.image}
              alt={c.alt}
              kicker={c.kicker}
              title={c.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
