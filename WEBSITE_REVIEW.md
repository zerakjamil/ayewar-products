# Website improvement record

## Current pass: 6 November 2026

Implemented a shared, screenshot-led product index for `/` and `/products`, a quieter warm-dark visual system, concise filters, simplified navigation and footer, accessible contact fields with explicit email preparation, a paused-by-default detail gallery, and native dialog focus handling. Removed the artificial timed loading overlay and the unused consent banner (no analytics or optional cookie implementation exists in this checkout). Corrected documentation that described a nonexistent contact API. Preserved all six product routes and existing source assets.

## Evidence

- `npm run lint`: passed without warnings.
- `npm run build`: passed, including TypeScript and generation of the six product pages.
- `npm run test:smoke`: three checks passed against the local server: six reachable product pages, navigation and true missing-product 404s, and contact form semantics.
- Browser: checked 390px English and Arabic layouts with no horizontal document overflow; language persistence; menu Escape dismissal; gallery next-screen navigation; modal initial focus on Close; Escape dismissal; focus restoration to the original preview trigger; body-scroll restoration; required-field validation on the contact form.
- A fresh desktop preview had no captured console warnings or errors.
- Found and fixed a server/browser Kurdish numeral hydration mismatch and unknown product routes returning 200.

## Limits

No production deployment was performed. Email preparation is implemented; delivery through a configured external email application has not been tested or attempted. The smoke checks do not automate browser interactions. No visitor analytics or usability-study evidence exists to support comparative quality or conversion claims.

## Second pass: product identification and gallery controls

- Moved product names before preview images and reduced desktop heading whitespace. At 320px, the first product name begins approximately 364px from the top; at 1280px the first two product names begin approximately 434px from the top. Both measurements came from rendered DOM bounds, with matching screenshots inspected.
- Added typed gallery translations for English, Central Kurdish, and Arabic, including screen descriptions, previous/next, playback controls, pagination, close, and native fullscreen.
- Removed the remaining hidden eager image preload block. The gallery now renders the active screenshot, with the outgoing screenshot temporarily retained during a transition; it no longer renders every screenshot eagerly.
- Separated the requested autoplay state from temporary hover/focus pauses, preventing a misleading Start action while autoplay is already enabled. Keyboard focus pauses the slideshow.
- Improved primary gallery controls to 44px targets and pagination controls to 24px targets. Pagination styles now use a data attribute independent of translated labels.
- Prevented arrow-key default scrolling, kept counters in a stable LTR numeric order, and added polite announcements for manual screen changes.
- A live test found that native dialog behavior could move focus to browser chrome after the final control. Added explicit forward/reverse focus wrapping; verified Tab from the final Arabic pagination control returns to the first visible control inside the modal. Escape still closes and restores the original preview trigger.
- Removed unsupported precision and credential claims from product copy: millisecond/sub-second timing, zero server lag, official ELO, verified drivers/sellers, and unsupported fee assertions.

### Second-pass verification

- Lint: passed without warnings after the focus-wrap change.
- Final production build and TypeScript: passed after the focus-wrap and live-counter changes, including all six generated product pages.
- All three HTTP smoke checks passed after the gallery localization, layout, and product-copy changes.
- Browser: 320px portfolio and detail pages have no document overflow; English playback toggle and ArrowRight progression work; Kurdish ArrowLeft advances in RTL; Arabic modal controls and screen descriptions are localized; Arabic modal renders correctly at 768px; forward Tab wrap remains in the modal; Escape restores focus.
- Desktop first-viewport comparison completed at 1280px. Temporary viewport override was reset and the original preview tab preserved.

## Third pass: contact fallback, fullscreen compatibility, and developer checks

- Added a native `mailto:` form action using POST and plain-text encoding. A failing HTTP regression check first reproduced the missing fallback; the same check passed after the fix. Personal fields no longer default to a GET request in the page URL before hydration.
- Replaced controlled form fields with native form values read at submission, preserving browser/autofill/pre-hydration input. Rejected whitespace-only names and messages, verified error recovery, and removed redundant field placeholders. No external email was sent or composed during testing.
- Native fullscreen controls are now conditional on actual browser capability, expose pressed state, and disappear on request failure while keeping the regular modal usable. Closing a gallery only exits native fullscreen owned by that gallery, and an asynchronous request cannot leave fullscreen active after the modal has closed.
- Confirmed native fullscreen entry/exit, screenshot/device switching, reverse Tab wrapping, and focus restoration in the browser.
- A temporary localhost-only proxy applied `Permissions-Policy: fullscreen=()`: the native toggle disappeared while modal preview and Close remained usable. The same proxy blocked all scripts with CSP for a contact-page check: the form still rendered, kept its POST mail action, and native required-field validation focused the reason field. The temporary tab was closed and its server stopped with process exit 130.
- Verified reduced-motion behavior in a dedicated Chrome test tab through the DevTools Rendering override. The selected setting was visibly `prefers-reduced-motion: reduce`; Motion emitted its reduced-motion detection warning and manual gallery navigation advanced from screen 1 to screen 2. Restored `No emulation` and closed only the dedicated test tab. An unrelated browser-extension console error was present in that Chrome profile; it was not a website source error.
- Repaired the previously unusable invariant checker. It reads TypeScript literal data with the installed compiler instead of trying to import asset-bearing app modules into Node. `npm test` now checks six unique product slugs, 51 nonempty source assets, and nested interface/product translation parity in ckb/ar/en without a server. README validation instructions now match the actual commands.
- Tested the checker itself in a disposable temporary fixture: a valid baseline passed; a missing nested translation, duplicate slug, and missing asset each failed. Removed the fixture afterward.
- Removed decorative product ordinals and repeated visible counts, keeping only a localized screen-reader result announcement. All four filters were clicked and returned the expected pairs or all six products.

### Third-pass verification

- Final lint and production build passed after the fallback/fullscreen and visual cleanup changes; TypeScript and all six generated product routes passed.
- `npm test` passed. All four HTTP smoke checks also passed on the final rerun after the visual cleanup.
- `git diff --check` passed.
- Browser viewport override restored; the original in-app preview tab is preserved. No production deployment, external email delivery, new dependencies, or changes to unrelated existing deletions.

### Craft scan findings

The bundled UI Polish scanner reported 37 findings. Manual review confirmed two real follow-ups: route-specific loading layouts still reflect the previous design, and the about/detail screens use too many type sizes. Many spacing findings are scanner false positives: it checks a fixed whitelist, so valid 44px touch targets and 480/560/640/768/1024px dimensions are flagged with recommendations to use those identical values. Do not change correct values to suppress the scanner.

## Fourth pass: loading states, reading hierarchy, and keyboard landmarks

- `/products` now renders the shared portfolio loading component. The skeleton follows the actual title, wrapping filters, product names, and two-column desktop/one-column mobile previews.
- Detail loading now shares header, breadcrumb, identity, section spacing, and phone dimensions with the live detail screen. Both loading states were rendered through a temporary local QA route at 320px and 1024px. The QA route and test tab were removed before the final production build.
- Consolidated about/detail typography into page title, section heading, feature heading, body, and metadata roles. Shared containers align with navigation, and reading copy is clamped to 65 characters. A 320px screenshot exposed a mid-word product-name split; stacking the icon above the title on narrow screens fixed the layout without shrinking the text.
- Removed visible previous/next helper labels while retaining their accessible text. Unified Lucide stroke weight, centered gallery page indicators geometrically, and moved the scrollbar to the 8px spacing scale.
- A new failing regression check exposed navigation/footer nested inside the main landmark on non-index pages and unfocusable skip-link destinations. Corrected all primary and product pages. Browser validation confirmed activating the skip link focuses `main-content`, with header and footer outside it.
- The six-screen Students gallery was checked for previous wrap (1 to 6), next wrap (6 to 1), and direct pagination (screen 4), in addition to the earlier nine-screen gallery checks.

### Final verification evidence

- `npm run lint`: passed without warnings.
- `npm test`: passed; six unique routes, 51 source assets, and nested ckb/ar/en translation parity.
- `npm run build`: passed, including TypeScript and all six generated product routes. The build route list contains no QA route.
- `npm run test:smoke`: all four checks passed, now including header/main/footer order and focusable skip targets for all primary and product routes, plus missing-product 404 behavior and contact fallback semantics.
- `git diff --check`: passed.
- Manual browser evidence: final mobile title layouts in Kurdish, Arabic, and English; 320px document width remained 320px. Desktop detail and loading geometry checked at 1024px. The loading grid had one 280px column at 320px and two 444px columns at 1024px, with no horizontal document overflow.
- Main palette calculations: text/background 16.70:1, muted text/background 7.82:1, muted text/card 6.93:1, primary-button text/accent 14.23:1. These verify the shared palette pairs, not a blanket accessibility certification of every screenshot or pixel.
- The craft scanner no longer reports typography sprawl or stale loading files. Its remaining 29 findings are fixed-whitelist spacing/breakpoint false positives, including valid 4px multiples and responsive boundary values. The scanner itself was not altered.

## Acceptance audit

| Requirement | Authoritative evidence | Decision |
| --- | --- | --- |
| Improve the existing core journey deeply | Source and browser checks for product index, all four filters, six details, galleries, and contact preparation | Implemented and verified |
| Start from raw material | Existing source assets, rendered layouts, native form behavior, browser errors, actual command failures, and source data | Applied |
| Use professional methods and external checks | UI Polish and UltraReview dimensions; regression reproduction before contact/landmark fixes; lint, data tests, production build, HTTP checks, and native browser tests | Applied |
| Cut taglines, helper text, and decorative secondary labels | Compact product index, title-only identity, simplified navigation/footer/contact headings, removed product badges/ordinals/repeated counts and visible gallery hints | Implemented; required form labels and accessible names retained |
| Elevate UX, DX, and AX together | Clearer product discovery, shared layouts/skeletons, functioning validation commands, ordinary SSR links, explicit form labels, selected/pressed state, proper landmarks, keyboard focus and modal handling | Implemented and verified |
| Preserve existing functionality and unrelated work | All six product routes and 51 assets checked; unchanged dependencies; unrelated pre-existing Desktop deletions left alone; no commits or external publishing performed | Preserved within tested scope |
| Research before building unfamiliar features | Work stayed within existing React/Next patterns; no unfamiliar domain feature or new dependency was introduced | No comparison prerequisite triggered |
| Responsive, multilingual, keyboard, and reduced-motion behavior | Browser evidence across 320/390/768/1024/1280px over the four passes; ckb/ar/en controls, RTL arrows, focus containment/restoration, and Chrome reduced-motion emulation | Verified within recorded browser scope |
| Error and compatibility behavior | True missing-product 404s, required/whitespace input rejection and recovery, scripts-blocked contact rendering, fullscreen-disabled policy check, and native fullscreen entry/exit | Verified |
| Honest evidence and limitations | Unsupported credentials/performance/fee claims removed; README reflects actual email behavior; no claim of planetary superiority or measured conversion improvement | Applied |

The focused implementation objective is satisfied by the current source and recorded checks. No additional feature or implementation pass is required. Further comparative UX or conversion claims would require actual visitor research; external email delivery and deployment remain explicitly outside the verified local result. Do not create extra work merely to keep a loop running.

## Working constraints

Keep changes local and reversible; preserve unrelated existing Git changes, including the already deleted legacy Desktop subtree. Do not add new features or dependencies without a concrete need. If unfamiliar functionality becomes necessary, compare related GitHub open-source implementations before building it. Do not schedule additional wake-ups when the acceptance state is unchanged. An already accepted continuation should acknowledge its marker, inspect the goal state, and avoid duplicate edits if the goal is complete.


## 2026-11-07 — Collection order, selected previews, and phone frame

- Moved Ledger and Soragh after the original six products; shared catalog order also drives detail-page previous/next navigation.
- Added optional typed `cardMockups` data to select screens 1 and 2 for both new apps, keeping their full detail galleries in numbered order and retaining the existing card choices for other apps.
- Replaced the shared gallery chassis with a thin neutral frame, removed the simulated notch/home indicator and duplicate overlaid expand control, and used screenshot proportions plus `object-contain` in the inline gallery. Expanded device mode uses the same frame styling without artificial hardware overlays.
- Browser evidence: homepage accessibility tree lists Ledger and Soragh last; Soragh card image URLs resolve to `home-1` and `map-2`, both loaded. Ledger preview visibly shows its splash/home pair. Ledger gallery navigation reaches screen 2, expanded device mode renders without a simulated notch, and Escape returns focus to the expand control. Viewed the inline layout at the browser’s narrow viewport and expanded mode at 1024×900; reset the temporary viewport afterward.
- Validation: lint, catalog tests (8 unique routes, 64 assets, three-locale parity), production build, and whitespace checks passed. All four HTTP smoke checks passed.
- Scope: local changes only; no deployment or edits to the supplied screenshots.


## 2026-11-07 — Transit rebrand and driving district

- Raiders and Passengers use their supplied SVG symbols on light backgrounds; both names are written in English across locales. The old `/products/students` URL redirects to `/products/passengers`. Chessmancer’s first two card images are 1 and 2; the newly renamed magic-wheel image is number 3 in the twelve-image gallery.
- Replaced the rejected quiz with an optional Three.js/cannon-es driving district. A physics-controlled vehicle, boundary/obstacle and moving traffic bodies, walking figures, eight product beacons, touch and keyboard controls, and opt-in synthesized discovery sound are implemented. Kenney models are bundled under CC0; the Polyfork bus loads remotely with a geometric fallback. Model sources and terms are in README.
- Browser evidence: observed the world, Kenney trees/buildings and moving traffic; held forward and saw the vehicle reach Ledger’s beacon, the count advance to 1/8 and the Ledger dialog open, then resumed driving. A separate cannon-es simulation exposed and verified the fix for ground friction preventing movement. Full discovery of all eight beacons, sound output, and physical-device performance have not been independently verified. Browser automation and concurrent production builds were unusually slow on this machine.
- `npm audit --omit=dev` reported six dependency vulnerabilities (one critical, four high, one moderate), including Next.js and transitive packages; applicability and remediation need separate review.
- Final validation: lint, TypeScript, product-data tests, production build, `git diff --check`, and all four local HTTP smoke checks passed; smoke checks include `/play` and the old Students redirect.


## 2026-11-07 — Driving simulation and island layout

- Investigated the sideways cars: the Kenney sedan's front wheel nodes are on +Z while its motion was hard-coded along +X without rotation. Traffic now follows two independently authored closed routes and computes heading from each route segment; the player's Polyfork bus and local fallback were also aligned with forward motion.
- Moved world layout, path sampling and the bounded fixed-step clock to `src/game/district.mjs`. Replaced the old rectangular grid with a manually placed island, two connected irregular roads and non-grid scenery. Polyfork-hosted Easter Island and Sky Town terrain and a water tower are decorative; local terrain and vehicle fallbacks keep the game independent of those downloads.
- Browser observations: the new road network and traffic rendered; holding forward moved the bus through the scene. A second visual check showed the corrected bus orientation. The hosted surrounding island models were not independently verified in the visible viewport, and a complete eight-beacon play-through on the revised map remains unverified.
- `npm test` now runs route-heading, loop and fixed-step edge checks as well as the catalog invariants. Lint, TypeScript and the tests passed; the production build passed after the final orientation adjustment.


## 2026-11-07 — Road clearance and directional controls

- Replaced throttle-plus-steering input with camera-relative directional input: each arrow/WASD key drives toward its visible screen direction; diagonals are normalized. The physics controller accelerates toward a target velocity, brakes on release, and supports Space or the center D-pad button for stronger braking.
- Split renderer/physics lifecycle into `src/game/DistrictEngine.ts`; the React component owns UI and input. `district.mjs` owns driving math, road layout and scenery footprints.
- Moved houses to plots outside both road loops. An automated clearance check includes road half-width, model radius and a shoulder margin. The shoreline now supplies the collision walls, preventing movement over the surrounding sea.
- Added model shadows, warm lighting, a larger vehicle, rounded road joins, actual product icons on markers, subtle turning lean and reduced-motion-aware card transitions. Replaced the horizontal control row with a directional pad and center brake; simplified and lightened the HUD.
- Browser evidence: after a fresh reload, holding Up moved upward on screen and pressing Right turned/drove right. Inspected the cleared plots at 1280×900 and the D-pad at 320×740; DOM width and viewport width were both 320px. Temporary viewport override reset. Complete eight-app discovery and a physical phone play-through remain unverified.
- Validation: catalog invariants, all five game tests, lint, TypeScript, whitespace checks, production build and all four HTTP smoke checks passed.

## 2026-11-08 — Monochrome interface and consistent Ayewar branding

- Replaced the warm/green/blue interface tokens with black, white and neutral grays, including the game HUD. Product-card backgrounds no longer mix in each app's accent; detail feature icons inherit the neutral foreground. Removed the gallery's colored glows and decorative green status pulse. Supplied app screenshots, app icons and the 3D world's content retain their actual artwork.
- Replaced the long Kurdish browser/share title with **Ayewar — Apps & Games** and a concise description naming actual products. Product metadata uses its English product name followed by Ayewar, with matching Open Graph and Twitter titles.
- Replaced the default favicon with the AW symbol extracted from the exact lockup imported by Navbar. Added black-backed 192px browser and 180px Apple icons. The 1200×630 Open Graph and Twitter images use that same full Ayewar lockup on black. No new artwork or remote image service was introduced.
- An initial HTTP check exposed a real inheritance error: product-level Open Graph/Twitter objects removed the root preview images. Added a failing regression check, then explicitly preserved the resolved parent images in product metadata. The same check passed after the fix. The images are ordinary static Next.js metadata files, following the [official file conventions](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image).
- Image origins use `NEXT_PUBLIC_SITE_URL`, Vercel's deployment host when available, or localhost for local work. Added `.env.example` and documented the custom-host build setting. The production build remains statically generated; no per-request host/header access was introduced.

### Verification and limits

- Lint, `npm test` (eight catalog routes, 67 source assets, three-language parity and five driving tests), TypeScript, production build and `git diff --check` passed. The final build generated 18 pages without metadata-origin warnings.
- All five HTTP smoke checks passed against both the development server and a temporary production server on 127.0.0.1:3001. The new check verifies home and product titles, Open Graph/Twitter image presence, PNG format and 1200×630 dimensions, alt text, black browser theme color, and fetchable favicon/browser/Apple assets. Existing route, landmark, 404, redirect and contact fallback checks remain green.
- Browser: checked desktop at 1280×900 and mobile at 320×740. Computed body background was rgb(0,0,0), primary text rgb(255,255,255), card art rgb(10,10,10), and selected filters rgb(255,255,255). Document width stayed within both viewports. The production browser displayed the new title and a loaded Ayewar header logo; its English screenshot was saved to `/tmp/ayewar-monochrome-desktop.jpg`.
- At 320px, Transit filtering returned the expected two apps; menu Escape dismissal worked; the Ledger fullscreen gallery rendered with neutral chrome, focused Close on entry, and restored focus to Full Screen Preview on Escape. Restored the original viewport and Kurdish preview afterward.
- UI Polish scanned 23 files and reported 36 findings: 35 fixed-whitelist spacing/dimension reports (including valid 44px touch targets and responsive boundaries) and one existing game-HUD typography-sprawl finding. Palette changes do not resolve that separate type-scale issue. UltraReview checks found no remaining blocker in the branding change after the metadata-inheritance fix.
- No production deployment or public messaging-platform scrape was performed. A custom deployment must set its public origin before building; no production domain is configured in this checkout. Whether an external service has refreshed a previously cached preview remains unverified. Existing prototype groundwork and unrelated changes, including legacy Desktop deletions, were preserved.

## 2026-11-08 — Release preparation for products.ayewar.com

- The user authorized pushing the reviewed website to GitHub and updating the `ayewar` SSH host. GitHub origin is `zerakjamil/ayewar-products`, branch `main`; the live checkout is `/home/aywar/ayewar-products` and was at `67f20fe` before deployment.
- Confirmed the live site is served by the `ayewar-products` Docker container on loopback port 8012. The checked-in Supervisor file is historical; no matching Supervisor process is running. Server-local Docker files and the modified tracked log must be preserved.
- Configured `https://products.ayewar.com` as the production metadata-origin fallback, retaining explicit-environment and Vercel overrides and localhost for development. This prevents a Docker build without hosting-specific variables from publishing localhost sharing-image URLs.
- Release scope includes the completed portfolio, app collection, game and monochrome branding work. Unrelated legacy Desktop deletions and unfinished `src/prototype` files remain outside the release commit.
- Deployment and public verification results will be recorded after they actually complete.
