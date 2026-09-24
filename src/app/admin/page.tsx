import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin console", robots: { index: false } };

// The order console (components/admin/admin-console.tsx) comes back once
// admin sign-in is implemented, so order controls are never left unprotected.
export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-[720px] px-[clamp(16px,4vw,24px)] pt-[clamp(40px,7vw,72px)] pb-[120px]">
      <h1 className="font-display text-[clamp(26px,4.8vw,46px)] tracking-[-.02em]">Admin console</h1>
      <p className="mt-3 text-base leading-[1.6] text-stone-600">
        Admin sign-in is coming soon. Until then, bookings arrive by WhatsApp and phone.
      </p>
    </main>
  );
}
