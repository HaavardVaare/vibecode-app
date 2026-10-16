export const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=${w}`;

export const brand = "Maison Nord";

export type Collection = {
  slug: string;
  title: string;
  kicker: string;
  image: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  alt: string;
  badge?: string;
  description: string;
  details: string[];
  sizes?: string[];
  stock: number;
  sku: string;
};

export const navLinks = [
  { label: "New In", href: "/#new-in" },
  { label: "Women", href: "/#collections" },
  { label: "Men", href: "/#collections" },
  { label: "Accessories", href: "/#collections" },
  { label: "Journal", href: "/#journal" },
];

export const hero = {
  kicker: "Autumn / Winter 2026",
  title: "The Quiet Coat",
  copy: "Considered tailoring in wool, cashmere and leather, made to be worn for years.",
  image: img("1485968579580-b6d095142e6e", 2400),
  alt: "Woman in a long dark checked coat on a city street",
};

export const collections: Collection[] = [
  {
    slug: "women",
    title: "Women",
    kicker: "Outerwear & Knitwear",
    image: img("1483985988355-763728e1935b", 1200),
    alt: "Woman in a burgundy coat and sunglasses holding shopping bags",
  },
  {
    slug: "men",
    title: "Men",
    kicker: "Tailoring",
    image: img("1594938298603-c8148c4dae35", 1200),
    alt: "Man in a blue check three-piece suit adjusting his jacket",
  },
  {
    slug: "bags",
    title: "Bags",
    kicker: "Leather Goods",
    image: img("1584917865442-de89df76afd3", 1200),
    alt: "Red structured leather handbag on a display plinth",
  },
  {
    slug: "shoes",
    title: "Shoes",
    kicker: "Footwear",
    image: img("1543163521-1bf539c55dd2", 1200),
    alt: "Floral printed high-heeled shoes on a white plinth",
  },
];

/** Large gallery views: the full shot plus two zoomed detail crops. */
export const getGallery = (p: Product) => {
  const id = p.image.match(/photo-([^?]+)/)![1];
  const view = (fx: number, fy: number, z: number) =>
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=focalpoint&fp-x=${fx}&fp-y=${fy}&fp-z=${z}&q=80&w=1400&h=1750`;
  return [
    { src: img(id, 1400), alt: p.alt },
    { src: view(0.5, 0.3, 2.2), alt: `${p.name}, detail` },
    { src: view(0.5, 0.72, 2.6), alt: `${p.name}, close-up` },
  ];
};

export type StockState = "in-stock" | "low-stock" | "out-of-stock";

export const getStockState = (stock: number): StockState =>
  stock <= 0 ? "out-of-stock" : stock <= 5 ? "low-stock" : "in-stock";

export const editorial = {
  kicker: "The Journal",
  title: "Texture, layered",
  copy: "Chunky cable knits, brushed wool and raw denim: our edit of the pieces that make colder days worth looking forward to.",
  image: img("1558769132-cb1aea458c5e", 1400),
  alt: "Knitwear in neutral tones hanging on a wooden rail beside dried pampas grass",
  cta: "Read the edit",
};

export const feature = {
  kicker: "Made to last",
  title: "Craft you can feel",
  copy: "Every piece is cut in small runs by partner ateliers in Italy and Portugal.",
  image: img("1434389677669-e08b4cac3105", 1400),
  alt: "Cream knitted poncho on a wooden hanger",
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
