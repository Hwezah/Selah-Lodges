# Selah Lodges

Booking site for Selah Lodges, two one-bed serviced apartments in Komamboga | Kyanja, Kampala.
Rebuilt from the high-fidelity prototype in [`docs/handoff/`](docs/handoff/README.md).

**Stack:** Next.js 16 (App Router) · Tailwind CSS v4 · shadcn/ui · Clerk auth (optional) · React Context for state.
Supabase persistence is planned. No environment variables are required; Clerk switches on when its keys are set.

## Getting started

```bash
npm install
npm run dev
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | Hero + search, photo collage, apartment cards, inclusions, reviews, FAQ |
| `/apartments/[id]` | Gallery, specs, amenities, booking card (calendar + price breakdown) |
| `/services` | Services & neighbourhood cards; add services to the trip cart |
| `/about`, `/contact` | Founder story, stats, vision; enquiry form (opens email) + contact cards |
| `/checkout` | Guest details, payment method (Mobile Money / bank), split pay, totals |
| `/checkout/pending` | Payment claim recorded, awaiting admin confirmation |
| `/checkout/done` | Confirmed booking (return target for card payments) |
| `/trips` | The guest's bookings, check-in details, message the host |
| `/admin` | Confirm or decline orders — Clerk sign-in + admin role (placeholder until Clerk keys are set) |

## Where things live

```
src/
  app/                    routes (see above), layout, icons, metadata
  components/site/        header (cart, notifications, account, drawer), footer,
                          book bar, calendar, toaster, scroll reveal, shared UI
  components/booking/     booking card, checkout, pending, done, trips
  context/
    ui-context.tsx        toasts, notifications, which panel is open
    booking-context.tsx   trip draft (apartment, dates, guests, cart), currency,
                          checkout form, orders
  lib/
    clerk.ts              clerkEnabled switch (auth only runs when keys are set)
    data.ts               apartments, services, copy, config (till numbers, fees…)
    booking.ts            pricing, dates/calendar, currency, phone, WhatsApp helpers
public/images/            client photos (compressed JPEG)
```

**Breakpoints** match the prototype's width tiers and are defined in `globals.css`:
`xs` 520 · `sm` 640 · `md` 760 · `lg` 900 · `xl` 1000 · `2xl` 1400.

## Screenshots at every breakpoint

```bash
npm run build && npm start
npm run capture   # writes screenshots/<width>/<route>.png
```

## Known limitations / next steps

- **Auth is off until Clerk keys are set** (`src/lib/clerk.ts`). Without them the account menu says sign-in is
  coming soon and `/admin` shows a placeholder. Admins: Clerk public metadata `{ "role": "admin" }` or `ADMIN_EMAILS`.
- **Orders live in the browser** (`localStorage`, `selah.*` keys). The admin console only sees orders made
  on the same device until bookings move to Supabase.
- **Blocked calendar days are a placeholder pattern** (`isBlocked` in `lib/booking.ts`) until real
  availability comes from the database.
- **SMS/email is not sent** — confirmations are notifications in the UI only.
- **Card payments (DPO Pay)** are shown as "coming soon"; see the handoff README for the integration plan.
- The supermarket card uses a placeholder photo (`svc-supermarket.jpg`) — no supermarket image was supplied.
