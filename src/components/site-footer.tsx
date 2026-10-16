import Link from "next/link";
import { brand } from "@/data/catalog";

const columns = [
  { title: "Client care", links: ["Contact us", "Shipping", "Returns", "FAQ"] },
  {
    title: "The house",
    links: ["Our story", "Craftsmanship", "Sustainability", "Careers"],
  },
  { title: "Legal", links: ["Terms", "Privacy", "Cookies"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <p className="font-serif text-2xl uppercase tracking-[0.3em]">
          {brand}
        </p>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow mb-4">{col.title}</h2>
            <ul className="space-y-2.5 text-muted">
              {col.links.map((l) => (
                <li key={l}>
                  <Link href="#" className="link-quiet">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="meta container-page border-t py-6">
        © 2026 {brand}. Sample storefront, images via Unsplash.
      </p>
    </footer>
  );
}
