"use client";

import { useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { type Category, filterProducts, type Product } from "@/data/catalog";
import { CategoryNav } from "./category-nav";
import { ProductCard } from "./product-card";
import { SearchForm } from "./search-form";

const URL_DELAY_MS = 250;

const pieces = (total: number) => `${total} ${total === 1 ? "piece" : "pieces"}`;

export function ProductSearch({
  products,
  categories,
  initialQuery,
}: {
  products: Product[];
  categories: Category[];
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const urlQuery = useSearchParams().get("q") ?? "";
  const writtenQuery = useRef(initialQuery);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // The URL only changes without us on back, forward and links: follow it then.
  useEffect(() => {
    if (urlQuery === writtenQuery.current) return;
    writtenQuery.current = urlQuery;
    clearTimeout(timer.current);
    setQuery(urlQuery);
  }, [urlQuery]);

  // A pending write must not change the URL of the page we navigated to.
  useEffect(() => () => clearTimeout(timer.current), []);

  const writeUrl = (value: string) => {
    clearTimeout(timer.current);
    const trimmed = value.trim();
    writtenQuery.current = trimmed;
    const search = trimmed ? `?q=${encodeURIComponent(trimmed)}` : "";
    window.history.replaceState(null, "", `/search${search}`);
  };

  const handleChange = (value: string) => {
    setQuery(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => writeUrl(value), URL_DELAY_MS);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    writeUrl(query);
    (event.currentTarget.elements.namedItem("q") as HTMLInputElement).blur();
  };

  const trimmed = query.trim();
  const results = filterProducts(products, trimmed);

  return (
    <>
      <SearchForm
        value={query}
        onChange={handleChange}
        onSubmit={handleSubmit}
        autoFocus={!initialQuery}
      />

      <p role="status" className="meta mb-8 mt-4 lg:mb-12">
        {trimmed
          ? `${pieces(results.length)} for "${trimmed}"`
          : pieces(results.length)}
      </p>

      {results.length > 0 ? (
        <ul className="product-grid lg:grid-cols-4">
          {results.map((p) => (
            <li key={p.slug}>
              <ProductCard
                product={p}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p className="mb-6 text-ink-soft">
            Nothing matches your search. Try another word, or browse by
            category.
          </p>
          <CategoryNav categories={categories} />
        </div>
      )}
    </>
  );
}
