import Link from "next/link";
import { ProductCard } from "./product-card";
import type { Product } from "@/data/catalog";

export function ProductSection({
  id,
  title,
  kicker,
  products,
  rail = false,
}: {
  id?: string;
  title: string;
  kicker: string;
  products: Product[];
  rail?: boolean;
}) {
  return (
    <section id={id} className="section scroll-mt-header">
      <div className="container-page">
        <header className="mb-8 flex items-end justify-between gap-6 lg:mb-12">
          <div>
            <p className="eyebrow mb-3 text-muted">{kicker}</p>
            <h2 className="heading-1">{title}</h2>
          </div>
          <Link href="#" className="eyebrow link shrink-0">
            Shop all
          </Link>
        </header>
        <ul className={rail ? "scroll-rail -mx-gutter px-gutter" : "product-grid"}>
          {products.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
