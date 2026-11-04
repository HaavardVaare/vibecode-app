import { asc, count, desc, eq } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";
import type { Category, Product } from "@/data/catalog";
import { db } from "@/db";
import { categories, products } from "@/db/schema";

const withRelations = { category: true, stock: true } as const;

type ProductRow = typeof products.$inferSelect & {
  category: { name: string; slug: string };
  stock: { quantity: number } | null;
};

const toProduct = (row: ProductRow): Product => ({
  slug: row.slug,
  name: row.name,
  category: row.category.name,
  categorySlug: row.category.slug,
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

/** The most recently added products, newest first. */
export async function getNewArrivals(limit = 12): Promise<Product[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: [desc(products.createdAt)],
    limit,
  });
  return rows.map(toProduct);
}

/** Total number of products in the catalog. */
export async function getProductCount(): Promise<number> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const [row] = await db.select({ total: count() }).from(products);
  return row.total;
}

/** Categories with at least one product, by name, pictured by their newest product. */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const rows = await db.query.categories.findMany({
    orderBy: [asc(categories.name)],
    with: {
      products: {
        columns: { image: true, alt: true },
        orderBy: [desc(products.createdAt)],
      },
    },
  });
  return rows
    .filter((c) => c.products.length > 0)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      productCount: c.products.length,
      image: c.products[0].image,
      alt: c.products[0].alt,
    }));
}

/** One category and all its products, newest first. */
export async function getCategoryWithProducts(
  slug: string,
): Promise<{ name: string; slug: string; products: Product[] } | undefined> {
  "use cache";
  cacheLife("minutes");
  cacheTag("products");

  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
  });
  if (!category) return undefined;

  const rows = await db.query.products.findMany({
    where: eq(products.categoryId, category.id),
    with: withRelations,
    orderBy: [desc(products.createdAt)],
  });
  return {
    name: category.name,
    slug: category.slug,
    products: rows.map(toProduct),
  };
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
