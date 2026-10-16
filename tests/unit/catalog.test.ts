import { describe, expect, it } from "vitest";
import {
  formatPrice,
  getGallery,
  getStockState,
  img,
  type Product,
} from "@/data/catalog";

describe("formatPrice", () => {
  it("formats whole euros with a currency symbol and thousands separator", () => {
    expect(formatPrice(2450)).toBe("€2,450");
    expect(formatPrice(190)).toBe("€190");
  });

  it("formats zero", () => {
    expect(formatPrice(0)).toBe("€0");
  });

  it("shows no decimals", () => {
    expect(formatPrice(1234.4)).toBe("€1,234");
  });
});

describe("getStockState", () => {
  it.each([
    [-1, "out-of-stock"],
    [0, "out-of-stock"],
    [1, "low-stock"],
    [5, "low-stock"],
    [6, "in-stock"],
    [120, "in-stock"],
  ] as const)("stock %i is %s", (stock, expected) => {
    expect(getStockState(stock)).toBe(expected);
  });
});

describe("img", () => {
  it("builds an Unsplash URL with the photo id and default width", () => {
    const url = img("abc123");
    expect(url).toContain("images.unsplash.com/photo-abc123");
    expect(url).toContain("w=1600");
  });

  it("uses a custom width", () => {
    expect(img("abc123", 900)).toContain("w=900");
  });
});

describe("getGallery", () => {
  const product: Product = {
    slug: "test-jacket",
    name: "Test Jacket",
    category: "Outerwear",
    price: 100,
    image: img("abc123", 900),
    alt: "A test jacket",
    description: "",
    details: [],
    stock: 1,
    sku: "TEST-0001",
  };

  it("returns three views of the same photo", () => {
    const gallery = getGallery(product);
    expect(gallery).toHaveLength(3);
    for (const view of gallery) {
      expect(view.src).toContain("photo-abc123");
    }
  });

  it("uses the product alt for the full shot and descriptive alts for the crops", () => {
    const [full, detail, closeUp] = getGallery(product);
    expect(full).toEqual({ src: img("abc123", 1400), alt: "A test jacket" });
    expect(detail.alt).toBe("Test Jacket, detail");
    expect(closeUp.alt).toBe("Test Jacket, close-up");
  });

  it("throws when the image is not an Unsplash photo URL", () => {
    expect(() =>
      getGallery({ ...product, image: "https://example.com/jacket.jpg" }),
    ).toThrow();
  });
});
