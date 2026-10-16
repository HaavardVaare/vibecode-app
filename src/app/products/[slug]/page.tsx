import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductSection } from "@/components/product-section";
import { StockStatus } from "@/components/stock-status";
import { brand, formatPrice, getGallery } from "@/data/catalog";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | ${brand}`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const related = await getRelatedProducts(product.slug);

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
          <li>
            <Link href="/#new-in" className="link-quiet">
              {product.category}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="container-page grid gap-8 pb-section lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_30rem]">
        <ProductGallery images={getGallery(product)} />

        <section
          aria-labelledby="product-title"
          className="lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start"
        >
          <div className="flex items-center gap-3">
            <p className="eyebrow text-muted">{product.category}</p>
            {product.badge && (
              <span className="eyebrow bg-accent px-2 py-1 text-paper">
                {product.badge}
              </span>
            )}
          </div>
          <h1 id="product-title" className="heading-1 mt-3">
            {product.name}
          </h1>
          <p className="mt-3 text-lead">{formatPrice(product.price)}</p>
          <div className="mt-4">
            <StockStatus stock={product.stock} />
          </div>

          <p className="mt-6 text-ink-soft">{product.description}</p>

          <div className="mt-8">
            <ProductPurchase product={product} />
          </div>

          <div className="divide-hairline mt-10 border-y">
            <details className="group py-4" open>
              <summary className="eyebrow flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                Details
                <span className="text-lead group-open:hidden" aria-hidden>
                  +
                </span>
                <span className="hidden text-lead group-open:inline" aria-hidden>
                  −
                </span>
              </summary>
              <ul className="mt-4 list-disc space-y-1.5 pl-5 text-ink-soft">
                {product.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </details>
            <details className="group py-4">
              <summary className="eyebrow flex cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden">
                Shipping &amp; returns
                <span className="text-lead group-open:hidden" aria-hidden>
                  +
                </span>
                <span className="hidden text-lead group-open:inline" aria-hidden>
                  −
                </span>
              </summary>
              <p className="mt-4 text-ink-soft">
                Complimentary standard shipping on all orders, delivered in 2–4
                working days. Free returns within 30 days of delivery.
              </p>
            </details>
          </div>

          <p className="meta mt-4">Ref. {product.sku}</p>
        </section>
      </div>

      <ProductSection
        kicker="Complete the look"
        title="You may also like"
        products={related}
        rail
      />
    </main>
  );
}
