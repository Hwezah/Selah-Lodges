import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container, Eyebrow } from "@/components/site/ui";
import { STATS, TIMELINE } from "@/lib/data";

export const metadata: Metadata = {
  title: "About",
  description: "Selah Lodges started as a passion to create spaces of stillness in Komamboga near Kyanja, Kampala.",
};

export default function AboutPage() {
  return (
    <main>
      <Container className="pt-[clamp(28px,5vw,48px)] pb-24">
        <div className="flex flex-wrap items-center gap-[clamp(28px,4vw,56px)]">
          <div data-reveal className="min-w-0 flex-[1.15_1_320px]">
            <Eyebrow>Our story, from the founder</Eyebrow>
            <h1 className="font-display mt-3 text-[clamp(28px,5.4vw,58px)] tracking-[-.02em]">About Selah Lodges</h1>
            <p className="mt-[18px] max-w-[56ch] text-[16.5px] leading-[1.7] text-stone-700">
              “Selah Lodges started as a passion to create spaces of stillness where people can reconnect with
              themselves, restore their energy, and re-emerge with purpose. We strive to offer more than just
              accommodation — a true sanctuary of comfort and reflection.” — Penny Baluti, Founder
            </p>
            <p className="mt-3.5 max-w-[56ch] text-[16.5px] leading-[1.7] text-stone-700">
              We are one of the top lodges in Komamboga near Kyanja, Kampala — offering thoughtfully curated spaces for
              rest, reflection, and personal renewal.
            </p>
          </div>
          <div data-reveal className="relative h-[clamp(240px,34vw,440px)] w-full min-w-0 flex-[1_1_300px] overflow-hidden rounded-[18px] bg-stone-100">
            <Image src="/images/penny.jpg" alt="Penny Baluti, founder" fill priority sizes="(min-width: 640px) 45vw, 100vw" className="object-cover object-[center_30%]" />
          </div>
        </div>

        <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-4">
          {STATS.map((s) => (
            <div key={s.label} data-reveal className="rounded-[14px] border border-stone-200 bg-white p-[clamp(13px,3.2vw,24px)]">
              <div className="font-display text-[clamp(32px,4vw,40px)] leading-none tracking-[-.01em]">{s.n}</div>
              <div className="mt-2.5 text-[13.5px] leading-[1.5] text-stone-500">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-[clamp(36px,6vw,56px)] flex flex-wrap items-start gap-[clamp(24px,4vw,48px)]">
          <h2 className="font-display min-w-0 flex-[1_1_260px] text-center text-[clamp(26px,4.6vw,36px)] tracking-[-.015em] sm:text-left">
            Our vision
          </h2>
          <div className="grid min-w-0 flex-[1.4_1_340px]">
            {TIMELINE.map((t) => (
              <div key={t.title} data-reveal className="grid grid-cols-[90px_1fr] gap-[22px] border-t border-stone-200 py-[22px]">
                <div className="text-sm font-semibold text-gold">{t.year}</div>
                <div>
                  <div className="text-[15.5px] font-semibold">{t.title}</div>
                  <div className="mt-[5px] max-w-[62ch] text-[14.5px] leading-[1.6] text-stone-500">{t.body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-[clamp(20px,4vw,32px)] rounded-[20px] bg-stone-900 p-[clamp(22px,5vw,48px)] text-stone-50">
          <div className="min-w-0 flex-[1_1_280px]">
            <h2 className="font-display text-[clamp(26px,5.4vw,34px)]">Planning a longer stay?</h2>
            <p className="mt-2.5 max-w-[52ch] text-[15px] leading-[1.6] text-stone-300">
              Talk to us about extended stays, group bookings, or adding laundry, cleaning and car wash to your visit.
            </p>
          </div>
          <Link
            href="/contact"
            className="flex min-h-12 flex-[1_1_240px] items-center justify-center rounded-xl bg-stone-50 px-6 text-[14.5px] font-semibold text-stone-900 hover:bg-stone-200 hover:text-stone-900"
          >
            Talk to Penny
          </Link>
        </div>
      </Container>
    </main>
  );
}
