import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal";
import { CONFIG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms for booking and staying at Selah Lodges.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Booking with us"
      title="Terms of service"
      updated="5 October 2026"
      intro="These terms apply when you use selahlodges.com, create an account or book a stay at Selah Lodges in Komamboga, Kyanja, Kampala. By booking, you agree to them."
    >
      <h2>Your account</h2>
      <p>
        Keep your sign-in details private and give us accurate information. You&apos;re responsible for bookings made
        from your account. We may close accounts that are misused.
      </p>

      <h2>Bookings and payment</h2>
      <ul>
        <li>A booking is confirmed once we&apos;ve received payment and sent you a confirmation.</li>
        <li>Prices are shown per night, in US dollars or Ugandan shillings, plus any fees and extras listed at checkout.</li>
        <li>You can pay by mobile money (MTN or Airtel). Card payments are coming soon.</li>
      </ul>

      <h2>Cancellations and refunds</h2>
      <ul>
        <li>Free cancellation up to 7 days before arrival.</li>
        <li>Within 7 days of arrival, 50% of the booking is charged.</li>
        <li>Within 3 days of arrival, or if you don&apos;t arrive, the full booking is charged.</li>
        <li>Group bookings of three rooms or more need 30 days&apos; notice. Promotional rates are final.</li>
        <li>Refunds go back to the original payment method within 7–14 business days.</li>
      </ul>

      <h2>Changes and early departure</h2>
      <p>
        Date changes are welcome, subject to availability. Changes within 7 days of arrival count as a cancellation and
        a new booking. Leaving early is charged at the full original reservation.
      </p>

      <h2>House rules</h2>
      <ul>
        <li>Check-in is from 2pm on your arrival day, using the gate and door code we send you.</li>
        <li>Selah is quiet and reflective: no parties or loud gatherings.</li>
        <li>Please respect other guests, the neighbours and the apartment, and follow any pet or smoking rules.</li>
        <li>You&apos;re responsible for damage caused during your stay beyond normal wear and tear.</li>
      </ul>

      <h2>Liability</h2>
      <p>
        We work hard to make your stay comfortable and safe, but we aren&apos;t responsible for losses we couldn&apos;t
        reasonably prevent, such as power or water cuts from public suppliers. Please keep valuables secure.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle your information is explained in our <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of Uganda.</p>

      <h2>Contact us</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> or call{" "}
        {CONFIG.phones.join(" / ")}.
      </p>
    </LegalPage>
  );
}
