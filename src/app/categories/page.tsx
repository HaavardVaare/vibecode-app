import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryTile } from "@/components/category-tile";
import { brand } from "@/data/catalog";
import { getCategories } from "@/lib/products";

export const metadata: Metadata = {
  title: `Categories | ${brand}`,
  description: "Browse every category from the house.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main>
      <Breadcrumbs links={[{ label: "Home", href: "/" }]} current="Categories" />

      <div className="container-page pb-section">
        <header className="mb-8 lg:mb-12">
          <p className="eyebrow mb-3 text-muted">Shop by category</p>
          <h1 className="heading-1">Categories</h1>
        </header>

        {categories.length > 0 ? (
          <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {categories.map((c) => (
              <li key={c.slug}>
                <CategoryTile
                  href={`/categories/${c.slug}`}
                  image={c.image}
                  alt={c.alt}
                  kicker={`${c.productCount} ${c.productCount === 1 ? "piece" : "pieces"}`}
                  title={c.name}
                  heading="h2"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">
            Nothing here just yet. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
