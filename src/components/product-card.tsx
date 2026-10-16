import Image from "next/image";
import Link from "next/link";
import { formatPrice, getStockState, type Product } from "@/data/catalog";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = getStockState(product.stock) === "out-of-stock";
  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="media aspect-product">
          <Image
            src={product.image}
            alt={product.alt}
            fill
            sizes="(min-width: 768px) 33vw, 80vw"
            className={`zoom-on-hover ${soldOut ? "opacity-60" : ""}`}
          />
          {(soldOut || product.badge) && (
            <span className="eyebrow absolute left-3 top-3 bg-paper px-2 py-1">
              {soldOut ? "Sold out" : product.badge}
            </span>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <p className="meta">{product.category}</p>
          <h3 className="text-lead">{product.name}</h3>
          <p className="meta">{formatPrice(product.price)}</p>
        </div>
      </Link>
    </article>
  );
}
