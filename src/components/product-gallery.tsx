import Image from "next/image";

type Item = { src: string; alt: string };

/**
 * Mobile: swipeable snap rail. Desktop: first image full width,
 * remaining images in a two-column grid.
 */
export function ProductGallery({ images }: { images: Item[] }) {
  return (
    <ul className="-mx-gutter flex snap-x snap-mandatory gap-2 overflow-x-auto px-gutter lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-4 lg:overflow-visible lg:px-0">
      {images.map((img, i) => (
        <li
          key={img.src}
          className={`w-[88%] shrink-0 snap-start lg:w-auto ${i === 0 ? "lg:col-span-2" : ""}`}
        >
          <div className="media aspect-product">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              preload={i === 0}
              sizes={
                i === 0
                  ? "(min-width: 1024px) 55vw, 88vw"
                  : "(min-width: 1024px) 28vw, 88vw"
              }
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
