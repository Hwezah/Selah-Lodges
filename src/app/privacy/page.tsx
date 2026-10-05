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
      intro="Selah Lodges (“we”, “us”) runs serviced one-bed apartments in Komamboga, Kyanja, Kampala. This policy explains what personal information we collect when you use selahlodges.com or stay with us, why we collect it, and the choices you have."
    >
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Account details</strong>: your name and email address, and a password if you sign up with email. If
          you choose “Continue with Google”, Google shares your name, email address and profile picture with us.
        </li>
        <li>
          <strong>Booking details</strong>: the apartment, dates, number of guests, extras you add, your phone number,
          payment method and booking reference.
        </li>
        <li>
          <strong>Messages</strong>: anything you send us through the contact form, email, phone or WhatsApp.
        </li>
        <li>
          <strong>Technical information</strong>: cookies that keep you signed in, and settings saved in your browser
          (such as your trip draft and preferred currency). We don&apos;t use advertising or tracking cookies.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To create and secure your account and let you sign in.</li>
        <li>To take, confirm and manage your bookings, and to give you access codes for your stay.</li>
        <li>To contact you about your stay, answer your questions and send booking or account emails.</li>
        <li>To meet our legal, tax and accounting obligations.</li>
      </ul>
      <p>We don&apos;t sell your personal information or use it for advertising.</p>

      <h2>Who we share it with</h2>
      <p>We share only what is needed with the services that help us run the site:</p>
      <ul>
        <li>
          <strong>Supabase</strong>, which stores accounts and handles sign-in.
        </li>
        <li>
          <strong>Vercel</strong>, which hosts the website.
        </li>
        <li>
          <strong>Google</strong>, if you choose to sign in with Google.
        </li>
        <li>
          <strong>Mobile money providers</strong> (MTN and Airtel) when you pay by mobile money.
        </li>
      </ul>
      <p>We may also share information when the law requires it.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep your account for as long as it is open. We keep booking records for as long as tax and accounting
        rules require, then delete them. You can ask us to delete your account at any time.
      </p>

      <h2>Your rights</h2>
      <p>
        Under Uganda&apos;s Data Protection and Privacy Act, 2019, you can ask to see the personal information we hold
        about you, correct it, or have it deleted, and you can object to how we use it. Email{" "}
        <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> and we&apos;ll respond within 30 days.
      </p>

      <h2>Keeping it safe</h2>
      <p>
        Your information is sent over encrypted connections, and passwords are stored by Supabase in hashed form, never
        in plain text. Only the people who manage your bookings can see your booking details.
      </p>

      <h2>Children</h2>
      <p>Our site is meant for adults booking stays. We don&apos;t knowingly collect information from children.</p>

      <h2>Changes to this policy</h2>
      <p>If we change this policy, we&apos;ll update the date at the top of this page.</p>

      <h2>Contact us</h2>
      <p>
        Selah Lodges, Komamboga, Kyanja, Kampala, Uganda.
        <br />
        Email <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a> or call {CONFIG.phones.join(" / ")}.
      </p>
    </LegalPage>
  );
}
