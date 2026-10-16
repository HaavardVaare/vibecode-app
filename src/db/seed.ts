import { config } from "dotenv";
import { sql } from "drizzle-orm";
import { img } from "../data/catalog";
import { categories, products, stock } from "./schema";
import { seedProducts } from "./seed-data";

// Same file Next.js reads; falls back to .env. Loaded before db is imported.
config({ path: [".env.local", ".env"] });

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

async function main() {
  const { db } = await import("./index");
  try {
    await seed(db);
  } finally {
    await db.$client.end();
  }
}

async function seed(db: (typeof import("./index"))["db"]) {
  const categoryNames = [...new Set(seedProducts.map((p) => p.category))];

  await db
    .insert(categories)
    .values(categoryNames.map((name) => ({ name, slug: slugify(name) })))
    .onConflictDoUpdate({
      target: categories.slug,
      set: { name: sql`excluded.name` },
    });

  const categoryRows = await db.select().from(categories);
  const categoryId = new Map(categoryRows.map((c) => [c.name, c.id]));

  // The first product in the seed list is the newest, so "New in" keeps its order.
  const now = Date.now();
  await db
    .insert(products)
    .values(
      seedProducts.map((p, i) => ({
        slug: p.slug,
        sku: p.sku,
        name: p.name,
        description: p.description,
        categoryId: categoryId.get(p.category)!,
        priceCents: p.price * 100,
        image: img(p.photo, 900),
        alt: p.alt,
        badge: p.badge ?? null,
        details: p.details,
        sizes: p.sizes ?? null,
        createdAt: new Date(now - i * 60_000),
      })),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        sku: sql`excluded.sku`,
        name: sql`excluded.name`,
        description: sql`excluded.description`,
        categoryId: sql`excluded.category_id`,
        priceCents: sql`excluded.price_cents`,
        image: sql`excluded.image`,
        alt: sql`excluded.alt`,
        badge: sql`excluded.badge`,
        details: sql`excluded.details`,
        sizes: sql`excluded.sizes`,
      },
    });

  const productRows = await db.select().from(products);
  const productId = new Map(productRows.map((p) => [p.slug, p.id]));

  await db
    .insert(stock)
    .values(
      seedProducts.map((p) => ({
        productId: productId.get(p.slug)!,
        quantity: p.stock,
      })),
    )
    .onConflictDoUpdate({
      target: stock.productId,
      set: { quantity: sql`excluded.quantity`, updatedAt: sql`now()` },
    });

  console.log(
    `Seeded ${categoryNames.length} categories, ${seedProducts.length} products and stock.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
