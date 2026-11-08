# Ayewar

A product portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, and Framer Motion. The interface supports Central Kurdish (`ckb`), Arabic (`ar`), and English (`en`).

## Run

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Use the language selector to change languages; the preference persists locally when browser storage is available.

## Validate

```sh
npm run lint
npm test
npm run build
```

With a development or production server running:

```sh
npm run test:smoke
```

Set `SITE_URL` to test a different local server. The smoke checks verify the eight product routes, navigation and page landmarks, focusable skip-link destinations, missing-product responses, contact form semantics, and branded home/product sharing metadata with fetchable preview images and icons. They do not replace browser checks for filtering, mobile navigation, language persistence, or modal focus behavior. `npm test` checks unique product slugs, nonempty source assets, and nested translation parity without requiring a server or importing application code. The build remains a separate command.

## Structure

- `src/components/Portfolio.tsx`: shared homepage and product index, with in-memory filtering.
- `src/data/products.ts`: product identities, existing screenshots, and localized content.
- `src/i18n/translations.ts`: shared interface translations.
- `src/i18n/context.tsx`: language preference and document direction.
- `src/app/globals.css`: shared colors, layout, interaction states, and reduced-motion rules.
- `src/components/PhoneCarousel.tsx`: detailed screenshot gallery and native modal preview.

Product links remain ordinary links and are present in the server-rendered HTML. Filters use `aria-pressed`, navigation uses `aria-current`, and form fields have explicit labels.

## Contact

The contact form prepares a message addressed to `info@ayewar.com` in the visitor's email application. The visitor must send it there. A native mail form fallback is present before JavaScript loads, using POST to the email application rather than submitting personal fields in the page URL. There is no contact API, server-side inquiry storage, or webhook delivery in this checkout. The direct email link remains available if the visitor does not use the form.

## Visual direction

The product screenshots carry the color and detail. The surrounding interface uses black surfaces, white actions, neutral gray borders and text, aligned typography, and minimal copy. The index uses static previews; interactive galleries live on product pages and start paused. Shared loading placeholders follow the index layout.

The browser title is “Ayewar — Apps & Games”. Favicons use the symbol from the same Ayewar lockup as the header; the 1200×630 Open Graph and Twitter cards use that full lockup on black. These assets are local, so a link-preview crawler does not need JavaScript or an external image service. Production defaults to `https://products.ayewar.com`; `NEXT_PUBLIC_SITE_URL` overrides that origin when building for another host (see `.env.example`). Vercel's deployment origin is used automatically when available. Local development uses localhost.

## Review

Before publishing, verify desktop and narrow mobile widths in all three languages. Check filter membership, keyboard focus, the mobile menu's Escape behavior, gallery arrows and modal dismissal, and email preparation. Delivery through an installed email application requires a manual check on that device.

## Production

The live site is [products.ayewar.com](https://products.ayewar.com). Connect using the configured `ssh ayewar` alias; the checkout resolves to `/srv/storage/ayewar-products`. Its server-local Docker Compose configuration runs the `web` service as container `ayewar-products`, bound to `127.0.0.1:8012`. The checked-in Supervisor configuration is historical.

For application releases, pull `main` with `--ff-only`, retain the running image under a rollback tag, build and check a private candidate, then recreate only `web` with the verified image. Do not overwrite the server-local Docker files or the modified tracked log. Run `SITE_URL=https://products.ayewar.com npm run test:smoke` after switching. The public checks recognize Cloudflare-protected email links only when they decode to the expected contact address. Deployment evidence is recorded in `WEBSITE_REVIEW.md`.


The optional `/play` district uses Three.js and cannon-es. The bus loads from [Polyfork](https://github.com/lucas-martinic/polyfork-catalog); its free models are hosted by Polyfork under its separate license and are not redistributed here. The locally bundled buildings, tree, sedan, and character are Kenney CC0 models from [Hidencod/tge-assets](https://github.com/Hidencod/tge-assets), from the City Kit Suburban, Nature Kit, Car Kit, and Mini Characters packs. Discovery audio is synthesized in the browser and is off until enabled.

The district’s road paths and fixed-step simulation clock live in `src/game/district.mjs`. Traffic follows two independently authored loops; its heading follows each road segment. Polyfork’s hosted Easter Island and Sky Town terrain models and a water tower are optional scenery; the playable island and vehicle have local fallbacks if the remote assets cannot load.

Driving uses screen-relative arrows/WASD, normalized diagonal input, automatic steering and braking on release; Space or the center touch control applies the brake. `DistrictEngine.ts` handles the scene/physics lifecycle, while `district.mjs` holds the fixed-step clock, route data and controller math. The tests check all scenery footprints against both roads and their connecting segments.
