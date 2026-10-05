import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/site/legal";
import { CONFIG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Policies & house rules",
  description: "Cancellation, refund and house rules for stays at Selah Lodges.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Our promise"
      title="Policies & house rules"
      updated="5 October 2026"
      intro="We truly value your choice to stay with us at Selah Lodges. Our policies are designed with care — to ensure that every guest experience remains tranquil, fair, and memorable for all who visit."
    >
      <h2>1. Cancellation &amp; refund policy</h2>
      <p>
        At Selah Lodges, every reservation is personal. With only a limited number of carefully curated spaces, each
        booking is both a commitment from us and a valued intention from you. While we understand that plans may
        change, our policies are designed to balance flexibility for our guests with the responsibility of keeping our
        retreat running smoothly.
      </p>

      <h3>Flexible cancellation terms</h3>
      <ul>
        <li>
          <strong>Free cancellation:</strong> you may cancel your reservation <strong>up to 7 days before arrival</strong>{" "}
          at no charge.
        </li>
        <li>
          <strong>Late cancellation:</strong> if you need to cancel <strong>within 7 days of arrival</strong>, a{" "}
          <strong>50% charge of the total booking amount</strong> will apply.
        </li>
        <li>
          <strong>Last-minute cancellation or no-show:</strong> cancellations made <strong>within 3 days of arrival</strong>,
          or failure to arrive without notice, will result in a <strong>100% charge of the total booking value</strong>.
        </li>
      </ul>

      <h3>Refunds</h3>
      <ul>
        <li>
          Cancellations <strong>7 or more days before arrival: full refund</strong>.
        </li>
        <li>
          Cancellations <strong>between 3 and 7 days before arrival: 50% refund</strong>.
        </li>
        <li>
          Cancellations <strong>within 3 days of arrival</strong>, or no-shows: <strong>non-refundable</strong>.
        </li>
        <li>
          <strong>Refund processing:</strong> approved refunds will be processed using the{" "}
          <strong>same payment method</strong> used at the time of booking. Please allow{" "}
          <strong>7–14 business days</strong> for the refund to reflect, depending on your bank or payment provider.
        </li>
      </ul>

      <h3>Adjusting your stay</h3>
      <p>
        We are happy to help with <strong>date changes</strong>, subject to availability. Please note that{" "}
        <strong>changes made within 7 days of arrival</strong> are treated as a cancellation and rebooking under the
        same terms above.
      </p>

      <h3>Early departures</h3>
      <p>
        Should you leave earlier than planned, the <strong>full amount of the original reservation still applies</strong>,
        as your space is reserved exclusively for you.
      </p>

      <h3>Group bookings</h3>
      <p>
        For bookings of <strong>three rooms or more</strong>, we kindly request a <strong>30-day notice</strong> for
        cancellations or changes.
      </p>

      <h3>Special rates &amp; offers</h3>
      <p>
        Non-refundable and promotional bookings are <strong>final</strong> and <strong>cannot be modified or cancelled</strong>.
      </p>

      <h3>Unforeseen circumstances</h3>
      <p>
        In the event of unexpected disruptions — such as natural events or travel restrictions — we will do our best to
        offer a <strong>credit or date change for a future stay</strong>.
      </p>

      <h2>2. House rules</h2>
      <p>
        This space is intentionally quiet and reflective. While we welcome all guests, this stay is best suited for
        those who honor peace, mindfulness, and intentional living.
      </p>
      <ul>
        <li>No parties or loud gatherings are allowed.</li>
        <li>Guests are encouraged to enjoy a stay of calm, clarity, and space to be.</li>
        <li>Please respect other guests and the environment.</li>
        <li>Check-in/check-out times, pet policy, and smoking rules (if applicable) should be observed.</li>
      </ul>

      <h2>3. Your account and privacy</h2>
      <p>
        If you create an account, please keep your sign-in details private. How we handle your information is explained
        in our <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>Assistance</h2>
      <p>
        Email: <a href={`mailto:${CONFIG.reservationsEmail}`}>{CONFIG.reservationsEmail}</a>
        <br />
        Phone: {CONFIG.phones.join(", ")}
      </p>
    </LegalPage>
  );
}
