# Handoff: Selah Lodges booking site

## Overview
Booking site for **Selah Lodges**, which has two one-bed serviced apartments in Komamboga | Kyanja, Kampala. It replaces the owner's WordPress/WooCommerce site and will be hosted on **Vercel**. Guests can browse both apartments, view services and the neighbourhood, pick dates, check out (Mobile Money, card, or DPO), and track their trips. There is also a light admin view where Mobile Money orders are confirmed or declined.

## About the design files
`design/Selah Lodges.dc.html` is a **high-fidelity HTML prototype**, not production code. It uses a custom runtime (`support.js`): the template has `{{ }}` holes and a `class Component` holds the logic. Open it in a browser through any static server to see how it looks and behaves. **Rebuild it in a real framework.** Recommended: Next.js (App Router) on Vercel, with serverless routes for payments.

Some useful parts can be lifted straight into the rebuild: the data constants at the top of the `<script data-dc-script>` block (`PROPS`, `SPECS`, `PIC`, `EXPS`, `FILTERS`, `ICONS`) and the pricing, calendar and phone-formatting helpers (`totals()`, `calDays()`, `pickDay()`, `intl()`).

Dev hooks added for capture/testing (remove when you rebuild):
- `?route=home|detail|experiences|about|contact|checkout|trips|pending|done|admin` opens that route directly.
- `window.__selah` points at the component instance, and `window.__forceVw` overrides the width tier.

## Fidelity
**High fidelity.** Colours, type, copy, spacing and the responsive rules are final unless noted under "What's left".

## What's achieved
- Rebranded from Dorey Stays to **Selah Lodges**: logo mark, Marcellus + Jost type, gold `#B9975B` on stone neutrals.
- Final copy from the client's WP site: hero ("A sanctuary to reflect, reset and rise."), room descriptions, services, about, policies and FAQs.
- **Two apartments** (`penthouse` = One-Bed Apartment 1, `twobed` = One-Bed Apartment 2). Each is USD 50/night, sleeps 2, 560 ft², with a 13-item amenity list.
- Filters: "Both apartments" / "Apartment 1" / "Apartment 2".
- Real photos in `design/assets/`. The bedroom photos were deliberately swapped: Apt 1 uses `room2-bedroom.png` and Apt 2 uses `room1-bedroom.png`.
- Services page ("experiences" route): 6 cards, split into Services (laundry, cleaning, car wash; prices quoted on booking) and Neighbourhood (supermarket, access, hangouts). Guests can add services to a cart.
- Date-range calendar: past and blocked days are disabled, and a "dates held 15 min" toast appears. Blocked days are currently a **fake pattern**, `d % 17 === 3 || d % 23 === 7`.
- Pricing: nightly × nights + cleaning fee ($10) + service fee (11%) + tax (7.45% of stay+clean), plus cart services. There is an optional **split pay** mode (pay 50% now).
- USD/UGX currency toggle (rate 3,800 USh/$; UGX rounded to the nearest 1,000).
- Mobile Money checkout: MTN 0776 401100 / Airtel 0751 401198 (Peninah Baluti). The order goes to `pending`, the admin confirms or declines, and a toast plus notification says "SMS sent". Orders are stored in `localStorage` (`dorey.orders`, `dorey.booking`).
- Auth: loads Clerk if `clerkPublishableKey` is set; otherwise falls back to a mock email-and-code flow.
- Notifications panel, toasts, host message thread, FAQ accordion, contact page (reservations@selahlodges.com, WhatsApp 256776401100).
- Scroll-reveal animation (`revealUp`, .55s, cubic-bezier(.2,.7,.3,1), 70ms stagger, max 5); turned off when `prefers-reduced-motion` is set.

## What's left to do
1. **DPO Pay integration (next task).** Two Vercel functions: `POST /api/dpo/create` (createToken XML call, returns `TransToken`, redirect guest to `https://secure.3gdirectpay.com/payv2.php?ID=<token>`) and `GET /api/dpo/verify` (verifyToken on return and on DPO's callback). Env: `DPO_COMPANY_TOKEN` (secret, never client-side), `DPO_SERVICE_TYPE`, `DPO_ENV`. The owner still needs to supply: Service Type ID, sandbox vs live, currencies (UGX/USD), PTL, and the production return URL (update it in the DPO portal; the old WP callback stops working at cutover).
2. **Persistence.** Move bookings out of localStorage. Suggested: Supabase (bookings, orders, blocked_dates), plus an email to reservations@selahlodges.com on each new booking.
3. **Real availability.** Replace the fake blocked-day pattern with dates from the DB. Optionally sync iCal with Airbnb/Booking.com.
4. **Real SMS/email.** "SMS sent" is simulated only. Use Africa's Talking or Twilio for Uganda.
5. **Admin.** Protect the `admin` route (Clerk role) and list orders from the DB.
6. **Reviews.** `reviews: 0` for both apartments; add real reviews or hide the block.
7. **Remove the prototype-only data:** the demo message thread, the demo notifications, the 2.6s "Dates are flexible" toast, and the `dorey.*` storage keys (rename them to `selah.*`).
8. **Photos.** Check the resolution and crop of each image. `selah-bedroom.png` is an unused alternative bedroom shot.
9. **SEO/meta.** Title, description, OG image, favicon (`references/cropped-Selah-Lodges-Origin-Favicon-1-scaled-1.png`).
10. **Screenshots at every breakpoint.** Run `capture-breakpoints.mjs` (see Screenshots).

## Screens / routes
All routes are client-side (`state.route`). `vercel.json` rewrites every path to index.
- **home**: sticky header, hero (welcome pill, headline, search on ≥900px, photo collage on ≥640px), apartment filter tabs + 2 apartment cards, services teaser, about intro, neighbourhood, contact footer.
- **detail**: apartment gallery (living / bedroom / kitchen), spec row (area, guests, beds, baths + wifi, AC, parking, power backup, security), amenities, booking card with calendar and price breakdown.
- **experiences** (labelled "Services"): filter Everything / Services / Neighbourhood; 6 cards with add-to-cart.
- **about**, **contact** (topic select, message), **trips** (the guest's bookings), **checkout** (guest form, payment method, split pay, totals), **pending** (awaiting Mobile Money confirmation), **done** (confirmed, with ref), **admin** (orders list, confirm/decline).

## Responsive behaviour (as implemented)
Breakpoints come from `state.vw = window.innerWidth`, not CSS media queries. Spacing and type also scale fluidly with `clamp()`.

- **< 520**: cart icon hidden unless the cart has items.
- **< 640 (mobile portrait)**:
  - Hero pill, headline and body are **centred**; the photo collage beside the hero is hidden.
  - A **sticky bottom "Book a room" bar** appears on every route except checkout, pending and done. Off home it reads "Back to rooms". It turns gold when the info drawer is open.
  - The notifications panel becomes a fixed, centred sheet: `min(360px, 100vw-24px)`, top 72px.
  - The drawer is full width (100vw).
  - Nav extras (currency etc.) move into the drawer.
- **≥ 640**: nav extras are shown in the header; the collage is visible; the notifications panel drops down from the bell (336px).
- **< 760**: header CTA reads "Book"; at ≥760 it reads "Book a stay".
- **< 900**: the hero search is hidden and the "where" filter is ignored.
- **< 1000**: header nav links collapse into a hamburger drawer, which holds the nav. The drawer is `min(560px, max(35vw, 320px))` on ≥640.
- **≥ 1000**: full inline nav; the drawer shows stays and info instead of nav.
- Content max-width is 1400px; side padding is `clamp(14px, 3vw, 24px)`; header height is 68px.

## Your prompts on mobile portrait and the other breakpoints
The exact wording of your earlier layout prompts wasn't preserved in this session, so they couldn't be copied here verbatim. Two things capture them instead:
1. The implemented rules above. They are the result of those prompts and match the current design.
2. Your original annotated screenshots and sketches, in `references/`. The `Screenshot_*` files are captures from phone Chrome/Brave with notes; the `draw-*` files are your markups. Match them when rebuilding, especially the mobile portrait ones (Sep 19–23).
*If you still have the prompts in your chat history, paste them into this section before handing off.*

## Design tokens
- Fonts: **Marcellus** (display: wordmark, headlines) and **Jost** 300–700 (UI/body), from Google Fonts.
- Gold (primary/accent) `#B9975B`, hover `#A38148`; gold tint `#F5EFE4` (calendar range).
- Page background `#E9EAE6`; surface `#FAFAF9` / `#FFFFFF`; ink `#1C1917`.
- Muted text `#78716C`; placeholder `#A8A29E`; disabled `#D6D3D1`; border `#E7E5E4`; hairline `#F5F5F4`.
- Radii: 7 (segmented), 9–10 (calendar days), 14 (panels/cards), 99 (pills/dots).
- Shadow (panels): `0 16px 40px -12px rgba(28,25,23,.18)`. Header: `rgba(250,250,249,.85)` + `blur(12px)`.
- Motion: `sheetIn` .16s ease-out, `toastIn`, `revealUp` .55s.

## Configurable values (props in the prototype)
tillNumber "MTN 0776 401100" · tillName "Peninah Baluti · or Airtel 0751 401198" · adminWhatsApp 256776401100 · clerkPublishableKey · ugxRate 3800 · cleaningFee 10 · serviceFeePct 11 · enableSplitPay true · showBlockedDates true.

## Assets
`design/assets/`: the client's photos (room1/room2 living, bedroom, kitchen; hero-*; selah-*; svc-*), `selah-mark.png` (logo) and `penny.jpeg` (host). The brand identity sheets are in `references/Selah-Lodges-Brand-Identity-*`.

## Screenshots
- `screenshots/tablet-924/`: captures of every main route at 924px (the 900–999 tier).
- **Every other breakpoint**: run
  ```
  npm i -D playwright http-server && npx playwright install chromium
  npx http-server design -p 5173 &
  node capture-breakpoints.mjs
  ```
  This writes full-page PNGs of 8 routes at 360, 390, 844 (landscape), 560, 768, 960, 1280 and 1440 into `screenshots/<label>/`.

## Files
- `design/Selah Lodges.dc.html`: the full prototype (all routes).
- `design/support.js`: the prototype runtime (reference only).
- `design/assets/`: images.
- `design/vercel.json`: SPA rewrites.
- `references/`: the client's uploads (screenshots, sketches, brand identity).
- `capture-breakpoints.mjs`: the screenshot script.
