"use client";

import Image from "next/image";
import { useState } from "react";

import { ApartmentCard } from "@/components/site/apartment-card";
import { Calendar } from "@/components/site/calendar";
import { Container, CurrencyToggle, Eyebrow, FieldLabel, GuestStepper, Tabs } from "@/components/site/ui";
import { useBooking } from "@/context/booking-context";
import { useUI } from "@/context/ui-context";
import { CONFIG, APARTMENTS, FILTERS } from "@/lib/data";
import { datesLabel, fmtDate, guestsLabel } from "@/lib/booking";
import { cn } from "@/lib/utils";

type Filter = (typeof FILTERS)[number];

function scrollToStays() {
  const el = document.getElementById("stays");
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}

export function HomeTop() {
  const { checkIn, checkOut, guests, currency } = useBooking();
  const { panel, togglePanel, closePanels, toast } = useUI();
  const [where, setWhere] = useState("");
  const [filter, setFilter] = useState<Filter>(FILTERS[0]);

  const q = where.trim().toLowerCase();
  const visible = APARTMENTS.filter(
    (a) =>
      (filter === FILTERS[0] || a.kind === filter) &&
      (!q || `${a.loc} ${a.name} ${a.kind}`.toLowerCase().includes(q)),
  );

  const search = () => {
    if (!checkIn || !checkOut) {
      togglePanel("cal-hero");
      toast("warn", "Pick your dates", "Choose a check-in and check-out to see live pricing.");
      return;
    }
    toast("ok", "Apartments available", `${fmtDate(checkIn)} – ${fmtDate(checkOut)} for ${guests} guests.`);
    scrollToStays();
  };

  return (
    <>
      <section data-reveal>
        <Container className="pt-[clamp(32px,6vw,56px)] pb-2">
          <div className="mx-auto flex w-fit max-w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-stone-200 bg-white py-[5px] pr-3 pl-2 text-[12.5px] text-stone-600 sm:mx-0">
            <span className="rounded-full bg-gold-tint px-[7px] py-0.5 text-[11.5px] font-semibold text-gold">Welcome</span>
            Furnished lodges · Komamboga | Kyanja
          </div>
          <h1 className="font-display mx-auto mt-[22px] max-w-[19ch] text-center text-[clamp(30px,6.4vw,70px)] leading-[1.04] tracking-[-.02em] text-pretty sm:mx-0 sm:text-left">
            A sanctuary to reflect, reset and rise.
          </h1>
          <p className="mx-auto mt-[18px] max-w-[54ch] text-center text-[17px] leading-[1.6] text-stone-600 sm:mx-0 sm:text-left">
            Relax in beautifully furnished spaces at one of the premier lodges in Kampala — a harmonious blend of modern
            design and serene surroundings.
          </p>

          <div className="mt-[34px] hidden flex-wrap items-stretch gap-1 rounded-2xl border border-stone-200 bg-white p-2 shadow-card lg:flex">
            <label className="min-w-0 flex-[1_1_190px] rounded-xl px-3.5 py-3">
              <FieldLabel>Where</FieldLabel>
              <input
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="Komamboga, Kyanja…"
                className="mt-[5px] w-full border-0 bg-transparent text-[14.5px] outline-none"
              />
            </label>
            <button
              type="button"
              data-keep-open
              onClick={() => togglePanel("cal-hero")}
              className="min-w-0 flex-[1_1_150px] rounded-xl px-3.5 py-3 text-left hover:bg-stone-50"
            >
              <FieldLabel>Dates</FieldLabel>
              <div className={cn("mt-1.5 text-[14.5px]", checkIn ? "text-stone-900" : "text-stone-400")}>
                {datesLabel(checkIn, checkOut)}
              </div>
            </button>
            <div className="flex min-w-0 flex-[1_1_210px] items-center justify-between gap-2 rounded-xl px-3.5 py-3">
              <div className="min-w-0">
                <FieldLabel>Guests</FieldLabel>
                <div className="mt-1.5 whitespace-nowrap text-[14.5px]">{guestsLabel(guests)}</div>
              </div>
              <GuestStepper size="lg" />
            </div>
            <button
              type="button"
              onClick={search}
              className="flex min-h-12 flex-[1_1_140px] items-center justify-center gap-2 rounded-xl bg-gold px-[26px] text-[14.5px] font-medium text-stone-50 hover:bg-gold-hover"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Search
            </button>
          </div>

          {panel === "cal-hero" && (
            <div className="mt-2.5 flex justify-center" data-keep-open>
              <div className="w-full max-w-[380px] animate-sheet-in rounded-2xl border border-stone-200 bg-white p-4 shadow-panel">
                <Calendar onDone={closePanels} />
              </div>
            </div>
          )}
        </Container>
      </section>

      <section data-reveal>
        <Container className="pt-[clamp(26px,5vw,40px)]">
          <div className="flex flex-wrap gap-3">
            <div className="relative h-[clamp(220px,34vw,380px)] min-w-0 flex-[2_1_320px] overflow-hidden rounded-2xl bg-stone-100">
              <Image src="/images/hero-living.jpg" alt="Selah Lodges living room" fill priority sizes="(min-width: 640px) 66vw, 100vw" className="object-cover" />
            </div>
            <div className="hidden h-[clamp(220px,34vw,380px)] min-w-0 flex-[1_1_220px] flex-col gap-3 sm:flex">
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-stone-100">
                <Image src="/images/hero-balcony.jpg" alt="Balcony" fill sizes="33vw" className="object-cover" />
              </div>
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-stone-100">
                <Image src="/images/hero-cushions.jpg" alt="Living room detail" fill sizes="33vw" className="object-cover" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section data-reveal id="stays" className="scroll-mt-20">
        <Container className="pt-[clamp(44px,7vw,72px)]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="min-w-0">
              <Eyebrow>Selah accommodations</Eyebrow>
              <h2 className="font-display mt-2.5 text-[clamp(27px,5.2vw,40px)] tracking-[-.015em]">Accommodation types</h2>
            </div>
            <div className="flex max-w-full min-w-0 flex-wrap items-center gap-3">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <CurrencyToggle />
                <span className="whitespace-nowrap text-[11.5px] text-stone-400">
                  {currency === "UGX"
                    ? `USh ${CONFIG.ugxRate.toLocaleString("en-US")} to $1`
                    : "Pay in USD or Ugandan shillings"}
                </span>
              </div>
              <Tabs options={FILTERS} value={filter} onChange={setFilter} />
            </div>
          </div>

          <div className="mt-7 grid grid-cols-[repeat(auto-fill,minmax(min(100%,320px),1fr))] gap-[22px]">
            {visible.length === 0 && (
              <div className="col-span-full rounded-2xl border border-stone-200 bg-white px-7 py-10 text-center">
                <div className="text-base font-semibold">
                  {q ? `No apartments match “${where.trim()}”.` : "No apartments match this filter."}
                </div>
                <div className="mt-1.5 text-sm text-stone-500">
                  Try Komamboga or Kyanja — or clear the search to see every apartment.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWhere("");
                    setFilter(FILTERS[0]);
                  }}
                  className="mt-[18px] h-10 rounded-[10px] bg-gold px-5 text-[13.5px] font-medium text-stone-50 hover:bg-gold-hover"
                >
                  Clear search
                </button>
              </div>
            )}
            {visible.map((a) => (
              <ApartmentCard key={a.id} apartment={a} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
