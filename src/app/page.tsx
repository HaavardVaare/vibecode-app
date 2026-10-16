import { CollectionGrid } from "@/components/collection-grid";
import { EditorialSplit } from "@/components/editorial-split";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { ProductSection } from "@/components/product-section";
import { editorial, feature } from "@/data/catalog";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();
  return (
    <>
      <main>
        <Hero />
        <CollectionGrid />
        <ProductSection
          id="new-in"
          kicker="Just arrived"
          title="New in"
          products={products.slice(0, 6)}
        />
        <EditorialSplit id="journal" {...editorial} />
        <ProductSection
          kicker="Curated for you"
          title="Signature pieces"
          products={products.slice(6)}
          rail
        />
        <EditorialSplit {...feature} cta="Our craftsmanship" reverse />
        <Newsletter />
      </main>
    </>
  );
}
