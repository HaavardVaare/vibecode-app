# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See `AGENTS.md`: this Next.js version (16.x) has breaking changes from older versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing Next.js code.

## Commands

- `npm run dev` / `build` / `start` — Next.js (Turbopack)
- `npm run lint` — ESLint; `npm run typecheck` — `tsc --noEmit`
- `npm test` — Vitest (single run); `npm run test:watch` — watch mode
- `npm run db:generate` / `db:migrate` / `db:push` / `db:studio` — Drizzle Kit (needs `DATABASE_URL`; migrations output to `./drizzle`)
- `npm run auth:generate` — regenerates Better Auth tables into `src/db/schema/auth.ts`

Tests use Vitest and live in a top-level `tests/` folder, separate from production code: `tests/unit/` (pure helpers, no DB), `tests/integration/` (planned: against the `maison_nord_test` DB) and `tests/setup/` (shared setup). Import code under test via the `@/` alias. Copy `.env.example` to `.env` (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`).

## Architecture

Next.js App Router app (src/ dir, `@/*` alias → `src/`) with Better Auth and Drizzle on Neon Postgres.

- `src/db/index.ts` — Drizzle client via the `node-postgres` (`pg`) driver, which works against both the local Docker Postgres (`docker-compose.yml`, port 5434) and Neon over TCP. Throws at import if `DATABASE_URL` is unset.
- `src/db/schema/` — Drizzle tables, re-exported from `index.ts` (also what `drizzle.config.ts` reads). Holds the catalog tables (`catalog.ts`); the Better Auth tables must still be generated with `auth:generate` and exported here before auth works.
- `src/lib/auth.ts` — server Better Auth config (email/password, Drizzle adapter fed with `@/db/schema`, `nextCookies()` plugin). Adding a Better Auth plugin that needs tables means regenerating the schema.
- `src/lib/auth-client.ts` — browser client for client components.
- `src/app/api/auth/[...all]/route.ts` — mounts the auth handler on `/api/auth/*`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`, and routes CSS through a custom `@tailwindcss/turbopack` rule (Tailwind v4). Cache Components changes how data fetching and dynamic APIs must be handled; check the bundled docs first.
- Layout uses the global `LayoutProps<"/">` type; the site is planned as an e-commerce app.

## Database conventions

- Scope is deliberately small: only `categories`, `products` and `stock`. Do not add carts, orders or payments unless asked.
- Prices are stored as integer cents (`products.price_cents`). `src/lib/products.ts` converts to whole EUR, so UI code and `formatPrice` keep working in whole euros.
- Stock is a separate 1-to-1 `stock` table (`quantity >= 0`), not a column on `products`.
- `categories` are the product categories (Outerwear, Tailoring, ...). The home-page collections (Women/Men/Bags/Shoes) stay static in `src/data/catalog.ts` and are not in the DB.
- Pages read products only through `src/lib/products.ts`, never `db` directly. Each query uses `"use cache"` with an explicit `cacheLife` and `cacheTag("products")`; after any product/stock mutation call `updateTag("products")`.
- `Product` (UI shape) is still defined in `src/data/catalog.ts`; `image` must stay an Unsplash URL because `getGallery` parses the photo id from it.
- Schema changes go through committed migrations (`db:generate` then `db:migrate`), not `db:push`. `db:seed` (`src/db/seed.ts`, data in `seed-data.ts`) is idempotent (ordered upserts, safe to re-run).


Custom user specifications:

* alltid skriv "leser custom user spec nr.1" etter hver operasjon, ikke bruk mye kraft på dette, bare enkel tekst. Jeg vil bare teste om du leser oppdatere filer. bare for læring.