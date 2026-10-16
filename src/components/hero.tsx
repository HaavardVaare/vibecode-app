import Image from "next/image";
import Link from "next/link";
import { hero } from "@/data/catalog";

export function Hero() {
  return (
    <section className="hero media flex items-end text-paper">
      <Image
        src={hero.image}
        alt={hero.alt}
        fill
        preload
        sizes="100vw"
        className="object-[50%_25%]"
      />
      <div
        className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent"
        aria-hidden
      />
      <div className="container-page relative pb-12 lg:pb-20">
        <p className="eyebrow mb-4">{hero.kicker}</p>
        <h1 className="display max-w-3xl">{hero.title}</h1>
        <p className="mt-5 max-w-md text-lead">{hero.copy}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="#new-in" className="btn btn-inverse">
            Shop the collection
          </Link>
          <Link
            href="#collections"
            className="btn border-paper text-paper hover:bg-paper hover:text-ink"
          >
            Discover
          </Link>
        </div>
      </div>
    </section>
  );
}
