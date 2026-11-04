import Image from "next/image";
import Link from "next/link";

export function CategoryTile({
  href,
  image,
  alt,
  kicker,
  title,
  heading: Heading = "h3",
}: {
  href: string;
  image: string;
  alt: string;
  kicker: string;
  title: string;
  heading?: "h2" | "h3";
}) {
  return (
    <Link href={href} className="group block">
      <div className="media aspect-portrait">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="zoom-on-hover"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-4 text-paper lg:p-6">
          <p className="eyebrow mb-1 opacity-80">{kicker}</p>
          <Heading className="heading-2">{title}</Heading>
        </div>
      </div>
    </Link>
  );
}
