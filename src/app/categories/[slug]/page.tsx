import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CategoryNav } from "@/components/category-nav";
import { ProductCard } from "@/components/product-card";
import { brand } from "@/data/catalog";
import { getCategories, getCategoryWithProducts } from "@/lib/products";

// A streaming fallback would commit a 200 before notFound() can send a 404.
export const instant = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categories/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryWithProducts(slug);
  if (!category) return {};
  return {
    title: `${category.name} | ${brand}`,
    description: `Browse ${category.name.toLowerCase()} from the house.`,
  };
}

export default async function CategoryPage({
  params,
}: PageProps<"/categories/[slug]">) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([
    getCategoryWithProducts(slug),
    getCategories(),
  ]);
  if (!category) notFound();
  const total = category.products.length;

  return (
    <main>
      <Breadcrumbs
        links={[
          { label: "Home", href: "/" },
          { label: "Categories", href: "/categories" },
        ]}
        current={category.name}
      />

      <div className="container-page pb-section">
        <header className="mb-8 lg:mb-12">
          <p className="eyebrow mb-3 text-muted">Category</p>
          <h1 className="heading-1">{category.name}</h1>
          <p className="meta mt-3">
            {total} {total === 1 ? "piece" : "pieces"}
          </p>
          <div className="mt-6">
            <CategoryNav categories={categories} activeSlug={category.slug} />
          </div>
        </header>

        {total > 0 ? (
          <ul className="product-grid lg:grid-cols-4">
            {category.products.map((p) => (
              <li key={p.slug}>
                <ProductCard
                  product={p}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft">
            Nothing in this category just yet. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
