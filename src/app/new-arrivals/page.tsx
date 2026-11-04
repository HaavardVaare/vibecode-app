import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { brand } from "@/data/catalog";
import { getNewArrivals, getProductCount } from "@/lib/products";

export const metadata: Metadata = {
  title: `New arrivals | ${brand}`,
  description: "The latest pieces from the house, newest first.",
};

export default async function NewArrivalsPage() {
  const [products, total] = await Promise.all([
    getNewArrivals(),
    getProductCount(),
  ]);

  return (
    <main>
      <nav aria-label="Breadcrumb" className="container-page py-4 lg:py-6">
        <ol className="meta flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="link-quiet">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            New arrivals
          </li>
        </ol>
      </nav>

      <div className="container-page pb-section">
        <header className="mb-8 lg:mb-12">
          <p className="eyebrow mb-3 text-muted">Just arrived</p>
          <h1 className="heading-1">New arrivals</h1>
          <p className="mt-4 max-w-md text-ink-soft">
            The latest pieces from the house, newest first.
          </p>
          {products.length > 0 && (
            <p className="meta mt-3">
              {products.length} / {total} {total === 1 ? "piece" : "pieces"}
            </p>
          )}
        </header>

        {products.length > 0 ? (
          <ul className="product-grid lg:grid-cols-4">
            {products.map((p) => (
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
            Nothing new just yet. Check back soon.
          </p>
        )}
      </div>
    </main>
  );
}
