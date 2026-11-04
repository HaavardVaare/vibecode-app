import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductSearch } from "@/components/product-search";
import { SearchForm } from "@/components/search-form";
import { brand } from "@/data/catalog";
import { getCategories, getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: `Search | ${brand}`,
  description: "Search the collection.",
  robots: { index: false },
};

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <main>
      <Breadcrumbs links={[{ label: "Home", href: "/" }]} current="Search" />

      <div className="container-page pb-section">
        <header className="mb-6">
          <p className="eyebrow mb-3 text-muted">Search</p>
          <h1 className="heading-1">Find a piece</h1>
        </header>

        <Suspense fallback={<SearchFallback />}>
          <SearchResults searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

/* Reads the query on the server so shared links arrive with their results. */
async function SearchResults({
  searchParams,
}: {
  searchParams: PageProps<"/search">["searchParams"];
}) {
  const { q } = await searchParams;
  const query = (Array.isArray(q) ? (q[0] ?? "") : (q ?? "")).trim();

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <ProductSearch
      products={products}
      categories={categories}
      initialQuery={query}
    />
  );
}

function SearchFallback() {
  return (
    <>
      <SearchForm />
      <ul aria-hidden className="product-grid mt-12 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <li key={i} className="media aspect-product" />
        ))}
      </ul>
    </>
  );
}
