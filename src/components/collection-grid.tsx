import Image from "next/image";
import Link from "next/link";
import { collections } from "@/data/catalog";

export function CollectionGrid() {
  return (
    <section
      id="collections"
      className="section container-page scroll-mt-header"
    >
      <header className="mb-8 flex items-end justify-between gap-6 lg:mb-12">
        <h2 className="heading-1">Shop by category</h2>
        <Link href="#" className="eyebrow link hidden sm:inline">
          View all
        </Link>
      </header>
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
        {collections.map((c) => (
          <li key={c.slug}>
            <Link href={`#${c.slug}`} className="group block">
              <div className="media aspect-portrait">
                <Image
                  src={c.image}
                  alt={c.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="zoom-on-hover"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-4 text-paper lg:p-6">
                  <p className="eyebrow mb-1 opacity-80">{c.kicker}</p>
                  <h3 className="heading-2">{c.title}</h3>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
