import { desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { Product } from "@/data/catalog";
import { db } from "@/db";
import { products } from "@/db/schema";

const withRelations = { category: true, stock: true } as const;

type ProductRow = typeof products.$inferSelect & {
  category: { name: string };
  stock: { quantity: number } | null;
};

const toProduct = (row: ProductRow): Product => ({
  slug: row.slug,
  name: row.name,
  category: row.category.name,
  price: row.priceCents / 100,
  image: row.image,
  alt: row.alt,
  badge: row.badge ?? undefined,
  description: row.description,
  details: row.details,
  sizes: row.sizes ?? undefined,
  stock: row.stock?.quantity ?? 0,
  sku: row.sku,
});

/** All products, newest first. */
export async function getProducts(): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: [desc(products.createdAt)],
  });
  return rows.map(toProduct);
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row ? toProduct(row) : undefined;
}

/** Other products, same category first, then the newest of the rest. */
export async function getRelatedProducts(
  slug: string,
  count = 4,
): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: [desc(products.createdAt)],
  });
  const current = rows.find((r) => r.slug === slug);
  const others = rows.filter((r) => r.slug !== slug);
  const sameCategory = others.filter(
    (r) => r.categoryId === current?.categoryId,
  );
  const rest = others.filter((r) => r.categoryId !== current?.categoryId);
  return [...sameCategory, ...rest].slice(0, count).map(toProduct);
}

export async function getAllProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db.select({ slug: products.slug }).from(products);
  return rows.map((r) => r.slug);
}
