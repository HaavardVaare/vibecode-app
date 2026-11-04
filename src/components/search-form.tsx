import type { FormEvent } from "react";

export function SearchForm({
  value,
  onChange,
  onSubmit,
  autoFocus = false,
}: {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  autoFocus?: boolean;
}) {
  return (
    <form
      action="/search"
      role="search"
      onSubmit={onSubmit}
      className="flex max-w-lg flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="search-query" className="sr-only">
        Search products
      </label>
      <input
        id="search-query"
        type="search"
        name="q"
        value={value}
        onChange={onChange && ((event) => onChange(event.target.value))}
        autoFocus={autoFocus}
        placeholder="Search products"
        autoComplete="off"
        className="field flex-1"
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
}
