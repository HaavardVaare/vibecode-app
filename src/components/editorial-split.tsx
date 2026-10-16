import Image from "next/image";
import Link from "next/link";

type Props = {
  kicker: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
  cta: string;
  reverse?: boolean;
  id?: string;
};

export function EditorialSplit({
  kicker,
  title,
  copy,
  image,
  alt,
  cta,
  reverse,
  id,
}: Props) {
  return (
    <section id={id} className="split scroll-mt-header bg-surface">
      <div
        className={`media aspect-square md:aspect-auto md:min-h-[44rem] ${reverse ? "md:order-2" : ""}`}
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex items-center px-gutter py-section md:px-[clamp(2rem,6vw,7rem)]">
        <div className="max-w-md">
          <p className="eyebrow mb-4 text-muted">{kicker}</p>
          <h2 className="heading-1">{title}</h2>
          <p className="mt-5 text-lead text-ink-soft">{copy}</p>
          <Link href="#" className="btn btn-secondary mt-8">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
