// Source data for `npm run db:seed`. Prices are whole EUR here; the seed
// converts them to cents.
export type SeedProduct = {
  slug: string;
  name: string;
  category: string;
  price: number;
  photo: string;
  alt: string;
  badge?: string;
  description: string;
  details: string[];
  sizes?: string[];
  stock: number;
  sku: string;
};

export const seedProducts: SeedProduct[] = [
  {
    slug: "leather-biker-jacket",
    name: "Leather Biker Jacket",
    category: "Outerwear",
    price: 2450,
    photo: "1551028719-00167b16eac5",
    alt: "Black leather biker jacket on a hanger",
    badge: "New",
    description:
      "A sharply cut biker in supple lambskin, finished with polished hardware and a quilted lining. Wears in beautifully with every season.",
    details: [
      "100% lambskin leather",
      "Quilted cotton lining",
      "Asymmetric zip, two zipped pockets",
      "Made in Italy",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 14,
    sku: "MN-OW-0412",
  },
  {
    slug: "navy-wool-suit",
    name: "Navy Wool Suit",
    category: "Tailoring",
    price: 1890,
    photo: "1617137968427-85924c800a22",
    alt: "Man in a navy suit and white shirt walking past a glass building",
    description:
      "A two-piece suit in fine navy wool, cut with a soft shoulder and a clean, modern line. Half-canvassed for a natural drape.",
    details: [
      "100% virgin wool",
      "Half-canvassed construction",
      "Two-button jacket, flat-front trousers",
      "Made in Portugal",
    ],
    sizes: ["46", "48", "50", "52", "54"],
    stock: 4,
    sku: "MN-TL-0178",
  },
  {
    slug: "suede-bomber",
    name: "Suede Bomber Jacket",
    category: "Outerwear",
    price: 1650,
    photo: "1591047139829-d91aecb6caea",
    alt: "Tan bomber jacket held on a hanger",
    description:
      "A relaxed bomber in soft brushed suede with ribbed trims. Light enough for early autumn, structured enough to carry a look.",
    details: [
      "100% goat suede",
      "Ribbed wool cuffs and hem",
      "Two welt pockets",
      "Made in Portugal",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 0,
    sku: "MN-OW-0433",
  },
  {
    slug: "square-acetate-sunglasses",
    name: "Square Acetate Sunglasses",
    category: "Eyewear",
    price: 420,
    photo: "1572635196237-14b3f281503f",
    alt: "Black acetate sunglasses on a white surface",
    description:
      "Classic square frames in hand-polished black acetate with polarised lenses. A quiet staple for every day.",
    details: [
      "Hand-polished acetate frame",
      "Polarised UV400 lenses",
      "Includes case and cloth",
      "Made in Italy",
    ],
    stock: 32,
    sku: "MN-EW-0021",
  },
  {
    slug: "chunky-knit-sweater",
    name: "Chunky Knit Sweater",
    category: "Knitwear",
    price: 720,
    photo: "1556905055-8f358a7a47b2",
    alt: "Grey chunky knit sweater folded beside raw denim and a rust beanie",
    description:
      "A heavyweight sweater in a chunky rib knit with a relaxed drop shoulder. Warm, soft and made to be lived in.",
    details: [
      "70% merino wool, 30% cashmere",
      "Ribbed collar, cuffs and hem",
      "Relaxed fit",
      "Made in Italy",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    sku: "MN-KN-0064",
  },
  {
    slug: "patent-top-handle-bag",
    name: "Patent Top-Handle Bag",
    category: "Bags",
    price: 1490,
    photo: "1584917865442-de89df76afd3",
    alt: "Red patent leather top-handle bag with a silver clasp",
    badge: "New",
    description:
      "A structured top-handle bag in glossy patent calfskin with a polished clasp and a suede-lined interior.",
    details: [
      "Patent calfskin leather",
      "Suede-lined interior with zipped pocket",
      "Detachable shoulder strap",
      "Made in Italy",
    ],
    stock: 3,
    sku: "MN-BG-0102",
  },
  {
    slug: "chronograph-steel-watch",
    name: "Steel Chronograph Watch",
    category: "Watches",
    price: 3200,
    photo: "1523170335258-f5ed11844a49",
    alt: "Steel chronograph watch with a blue dial",
    badge: "Limited",
    description:
      "A 42mm stainless steel chronograph with a deep blue dial and automatic movement, produced in a numbered edition of 300.",
    details: [
      "42mm brushed steel case",
      "Swiss automatic movement",
      "Sapphire crystal, 100m water resistance",
      "Made in Switzerland",
    ],
    stock: 2,
    sku: "MN-WT-0300",
  },
  {
    slug: "floral-wrap-dress",
    name: "Floral Wrap Dress",
    category: "Dresses",
    price: 980,
    photo: "1496747611176-843222e1e57c",
    alt: "Cream floral wrap dress blowing in the wind",
    description:
      "A fluid wrap dress in printed silk crepe with a tied waist and flutter sleeves. Made for long evenings and open windows.",
    details: [
      "100% silk crepe",
      "Self-tie wrap waist",
      "Fully lined",
      "Made in Italy",
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 9,
    sku: "MN-DR-0215",
  },
  {
    slug: "fine-gold-pendant",
    name: "Fine Gold Pendant",
    category: "Jewellery",
    price: 560,
    photo: "1611085583191-a3b181a88401",
    alt: "Delicate gold chain necklace with a small pendant",
    description:
      "A delicate pendant on a fine chain in recycled 18k gold vermeil. Wear it alone or layered.",
    details: [
      "18k gold vermeil on sterling silver",
      "Adjustable 40–45cm chain",
      "Comes in a signed pouch",
      "Made in France",
    ],
    stock: 0,
    sku: "MN-JW-0087",
  },
  {
    slug: "graphic-cotton-tee",
    name: "Graphic Cotton Tee",
    category: "Essentials",
    price: 190,
    photo: "1576566588028-4147f3842f27",
    alt: "Cream cotton t-shirt with a blue graphic print",
    description:
      "A heavyweight organic cotton tee with a screen-printed graphic. Boxy through the body, soft from the first wear.",
    details: [
      "100% organic cotton, 240gsm",
      "Screen-printed graphic",
      "Relaxed fit",
      "Made in Portugal",
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 120,
    sku: "MN-ES-0009",
  },
];
