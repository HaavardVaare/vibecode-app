import { getStockState } from "@/data/catalog";

const dot = {
  "in-stock": "bg-success",
  "low-stock": "bg-sale",
  "out-of-stock": "bg-subtle",
} as const;

export function stockLabel(stock: number) {
  const state = getStockState(stock);
  if (state === "out-of-stock") return "Sold out";
  if (state === "low-stock") return `Only ${stock} left`;
  return "In stock";
}

export function StockStatus({ stock }: { stock: number }) {
  const state = getStockState(stock);
  return (
    <p className="meta flex items-center gap-2 text-ink" role="status">
      <span className={`size-2 rounded-full ${dot[state]}`} aria-hidden />
      {stockLabel(stock)}
      {state === "in-stock" && (
        <span className="text-muted">· Ships within 2 working days</span>
      )}
    </p>
  );
}
