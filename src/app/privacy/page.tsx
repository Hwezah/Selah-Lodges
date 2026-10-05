import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal";
import { CONFIG } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Selah Lodges collects, uses and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your information"
      title="Privacy policy"
      updated="5 October 2026"
      intro="Every reservation at Selah Lodges is personal, and so is the information you share with us. This policy explains what we collect when you use our website or stay with us, and how we look after it."
    >
      <h2>Who we are</h2>
      <p>
        Selah Lodges, Komamboga | Kyanja, Kampala, Uganda. Our website address is{" "}
        <a href="https://www.selahlodges.com">https://www.selahlodges.com</a>.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details:</strong> your name and email address, and a password if you sign up with email. If
          you choose “Continue with Google”, Google shares your name, email address and profile picture with us.
        </li>
        <li>
          <strong>Booking details:</strong> the apartment, dates, number of guests, extras, your phone number, payment
          method and booking reference.
        </li>
        <li>
          <strong>Messages:</strong> anything you send us by email, phone, WhatsApp or the contact form.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To create your account and let you sign in securely.</li>
        <li>To confirm and manage your bookings and send you your access details for your stay.</li>
        <li>To reply to your questions and send emails about your bookings or account.</li>
        <li>To keep the records the law requires.</li>
      </ul>
      <p>We never sell your information or use it for advertising.</p>

      <h2>Cookies</h2>
      <ul>
        <li>
          <strong>Sign-in:</strong> a cookie keeps you signed in until you sign out.
        </li>
        <li>
          <strong>Your trip:</strong> your trip draft, bookings made on this device and preferred currency are saved in
          your browser for convenience.
        </li>
      </ul>
      <p>We don&apos;t use advertising or tracking cookies.</p>

      <h2>Embedded content and services</h2>
      <p>We use a small number of trusted services to run the website, and share only what each one needs:</p>
      <ul>
        <li>
          <strong>Supabase</strong> stores accounts and handles sign-in.
        </li>
        <li>
          <strong>Vercel</strong> hosts the website.
        </li>
        <li>
          <strong>Google</strong>, if you choose to sign in with Google.
        </li>
        <li>
          <strong>MTN and Airtel</strong> process mobile money payments.
        </li>
        <li>
          <strong>WhatsApp</strong>, if you choose to message us there.
        </li>
      </ul>

      <h2>Data retention</h2>
      <ul>
        <li>Your account is kept for as long as it is open. You can ask us to delete it at any time.</li>
        <li>Booking records are kept for as long as tax and accounting rules require, then deleted.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Under Uganda&apos;s Data Protection and Privacy Act, 2019, you can request a copy of the personal data we hold
        about you, ask us to correct it, or request erasure, excluding records we must keep for administrative or legal
        reasons. Email <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> and we&apos;ll respond within 30 days.
      </p>

      <h2>Data security</h2>
      <p>
        Your information travels over encrypted connections, and passwords are stored in hashed form, never in plain
        text. Only the people who manage your bookings can see your booking details.
      </p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we&apos;ll update the date at the top of this page.</p>

      <h2>Contact</h2>
      <p>
        Email: <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
        <br />
        Phone: {CONFIG.phones.join(", ")}
      </p>
    </LegalPage>
  );
}
