import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BookingCard } from "@/components/booking/booking-card";
import { SpecIcon } from "@/components/site/icon";
import { BackLink, Container } from "@/components/site/ui";
import { APARTMENTS, fullSpecs, listedAmenities } from "@/lib/data";

export function generateStaticParams() {
  return APARTMENTS.map((a) => ({ id: a.id }));
}

export const dynamicParams = false;

export async function generateMetadata(props: PageProps<"/apartments/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const a = APARTMENTS.find((x) => x.id === id);
  if (!a) return {};
  return {
    title: a.name,
    description: `${a.name} in ${a.loc} — ${a.sleeps}, USD ${a.price}/night.`,
    openGraph: { images: [{ url: a.images[0] }] },
  };
}

export default async function ApartmentPage(props: PageProps<"/apartments/[id]">) {
  const { id } = await props.params;
  const a = APARTMENTS.find((x) => x.id === id);
  if (!a) notFound();

  return (
    <main>
      <Container className="pt-[clamp(20px,4vw,32px)]">
        <BackLink href="/#stays">All apartments</BackLink>
        <h1 className="font-display mt-3.5 mb-1.5 text-[clamp(29px,5.6vw,44px)] tracking-[-.02em]">{a.name}</h1>
        <div className="text-sm text-stone-600">
          {a.loc} · {a.sleeps} · 94% guest satisfaction
        </div>

        <div className="mt-[22px] flex flex-wrap gap-2.5">
          <div className="relative h-[clamp(230px,32vw,420px)] min-w-0 flex-[2_1_320px] overflow-hidden rounded-2xl bg-stone-100">
            <Image src={a.images[0]} alt={`${a.name} living room`} fill priority sizes="(min-width: 640px) 66vw, 100vw" className="object-cover" />
          </div>
          <div className="flex h-[clamp(230px,32vw,420px)] min-w-0 flex-[1_1_200px] flex-col gap-2.5 overflow-hidden">
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-stone-100">
              <Image src={a.images[1]} alt={`${a.name} bedroom`} fill sizes="33vw" className="object-cover" />
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-stone-100">
              <Image src={a.images[2]} alt={`${a.name} kitchen`} fill sizes="33vw" className="object-cover" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-start gap-[clamp(28px,4vw,56px)] pb-20">
          <div className="min-w-0 flex-[1.6_1_340px]">
            <p className="max-w-[60ch] text-base leading-[1.7] text-stone-700">{a.desc}</p>
            <div className="my-8 h-px bg-stone-200" />
            <div className="flex flex-wrap items-center justify-center gap-x-[26px] gap-y-3.5 sm:justify-start">
              {fullSpecs(a).map((s) => (
                <span key={s.label} className="flex items-center gap-[9px] whitespace-nowrap text-[14.5px] text-stone-700">
                  <SpecIcon name={s.icon} size={22} className="text-stone-600" />
                  {s.label}
                </span>
              ))}
            </div>
            <div className="my-8 h-px bg-stone-200" />
            <div className="text-[13px] font-semibold uppercase tracking-[.06em] text-stone-500">
              What&apos;s included in this suite
            </div>
            <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-3">
              {listedAmenities(a).map((x) => (
                <div key={x} className="flex items-center gap-2.5 text-[14.5px] text-stone-700">
                  <span className="size-1.5 flex-none rounded-full bg-gold" />
                  {x}
                </div>
              ))}
            </div>
            <div className="my-8 h-px bg-stone-200" />
            <div className="flex items-center gap-[13px] rounded-[14px] border border-stone-200 bg-white p-[clamp(12px,3vw,18px)]">
              <Image src="/images/penny.jpg" alt="Penny Baluti" width={54} height={54} className="size-[54px] flex-none rounded-full object-cover object-top" />
              <div>
                <div className="text-[15px] font-semibold">Hosted by Penny</div>
                <div className="mt-[3px] text-[13.5px] text-stone-500">Founder &amp; Managing Director · replies on WhatsApp</div>
              </div>
            </div>
          </div>

          <BookingCard apartmentId={a.id} />
        </div>
      </Container>
    </main>
  );
}
