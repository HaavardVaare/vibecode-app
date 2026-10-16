"use client";

import { useState } from "react";
import { getStockState, type Product } from "@/data/catalog";
import { HeartIcon } from "./icons";

export function ProductPurchase({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const soldOut = getStockState(product.stock) === "out-of-stock";

  function addToBag() {
    if (product.sizes && !size) {
      setError(true);
      setMessage("Please select a size.");
      return;
    }
    setError(false);
    setMessage(
      `${product.name}${size ? `, size ${size},` : ""} added to your bag.`,
    );
  }

  return (
    <div className="space-y-6">
      {product.sizes && (
        <fieldset>
          <legend className="eyebrow mb-3 block">
            <span>Size{size ? `: ${size}` : ""}</span>
          </legend>
          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((s) => (
              <label key={s} className="relative">
                <input
                  type="radio"
                  name="size"
                  value={s}
                  disabled={soldOut}
                  checked={size === s}
                  onChange={() => {
                    setSize(s);
                    setError(false);
                    setMessage(null);
                  }}
                  className="peer sr-only"
                />
                <span className="flex min-h-12 cursor-pointer items-center justify-center border text-body transition-colors hover:border-line-strong peer-checked:border-line-strong peer-checked:bg-ink peer-checked:text-paper peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-disabled:cursor-not-allowed peer-disabled:text-subtle">
                  {s}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={addToBag}
          disabled={soldOut}
          className="btn btn-primary flex-1"
        >
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
        <button
          type="button"
          className="btn btn-secondary w-12 px-0"
          aria-label="Add to wishlist"
        >
          <HeartIcon />
        </button>
      </div>

      <p
        role="status"
        aria-live="polite"
        className={`meta min-h-5 ${error ? "text-sale" : "text-ink"}`}
      >
        {soldOut
          ? "This piece is currently unavailable. Check back soon."
          : message}
      </p>
    </div>
  );
}
