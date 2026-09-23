# Selah Lodges

Lodge booking app built with:

- **Next.js 16** (App Router, TypeScript, `src/` dir, Turbopack)
- **Tailwind CSS v4**
- **shadcn/ui** (new-york style, neutral base — `components.json`)
- **Clerk** for authentication (`src/proxy.ts` protects `/dashboard`)
- **React Context API** for client state (`src/context/`)
- Supabase planned (placeholders in `.env.example`)

## Getting started

```bash
npm install
cp .env.example .env.local   # add your Clerk keys
npm run dev
```

Open http://localhost:3000. Without keys, Clerk runs in keyless dev mode and
prints a link to claim a temporary application.

## Project structure

```
src/
  app/
    layout.tsx               # ClerkProvider + AppProviders + header
    page.tsx                 # Landing page
    dashboard/               # Protected route (requires sign-in)
    sign-in/[[...sign-in]]/  # Clerk <SignIn />
    sign-up/[[...sign-up]]/  # Clerk <SignUp />
  components/
    ui/                      # shadcn components
    layout/                  # Site header, etc.
  context/
    app-providers.tsx        # Composes all client providers
    booking-context.tsx      # Booking draft state + useBooking()
  lib/utils.ts               # cn() helper
  proxy.ts                   # Clerk middleware (Next 16 "proxy" convention)
```

## Adding shadcn components

```bash
npx shadcn@latest add dialog
```
