import Link from "next/link";
import type { Category } from "@/data/catalog";

export function CategoryNav({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug: string;
}) {
  return (
    <nav aria-label="Categories">
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        <li>
          <Link href="/categories" className="eyebrow link-quiet inline-block py-2">
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/categories/${c.slug}`}
              aria-current={c.slug === activeSlug ? "page" : undefined}
              className="eyebrow link-quiet inline-block py-2"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
