"use client";

import Image from "next/image";
import { useState } from "react";

import { Tabs } from "@/components/site/ui";
import { useBooking } from "@/context/booking-context";
import { useUI } from "@/context/ui-context";
import { SERVICES, SERVICE_FILTERS } from "@/lib/data";
import { cn } from "@/lib/utils";

type Filter = (typeof SERVICE_FILTERS)[number];

export function ServicesGrid() {
  const [filter, setFilter] = useState<Filter>("Everything");
  const { cart, toggleCartItem } = useBooking();
  const { openPanel } = useUI();
  const visible = SERVICES.filter((s) => filter === "Everything" || s.cat === filter);

  return (
    <>
      <Tabs options={SERVICE_FILTERS} value={filter} onChange={setFilter} className="mt-[34px] w-full" />
      <div className="mt-[26px] grid grid-cols-[repeat(auto-fill,minmax(min(100%,330px),1fr))] gap-[22px]">
        {visible.map((s) => {
          const on = cart.includes(s.title);
          return (
            <div key={s.title} data-reveal className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white">
              <div className="relative aspect-[16/10] bg-stone-100">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="(min-width: 1000px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-5 pt-[18px] pb-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex-none whitespace-nowrap rounded-full bg-gold-tint px-[9px] py-[3px] text-[11.5px] font-semibold text-gold">
                    {s.cat}
                  </span>
                  <span className="whitespace-nowrap text-[12.5px] text-stone-400">{s.meta}</span>
                </div>
                <div className="mt-3 text-[17px] font-semibold tracking-[-.01em]">{s.title}</div>
                <div className="mt-[7px] mb-[18px] text-sm leading-[1.55] text-stone-500">{s.body}</div>
                <div className="mt-auto flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                  <span className="text-sm font-semibold">{s.price}</span>
                  <button
                    type="button"
                    data-keep-open
                    onClick={() => {
                      toggleCartItem(s.title);
                      if (!on) openPanel("cart");
                    }}
                    className={cn(
                      "h-[34px] flex-none whitespace-nowrap rounded-[9px] border px-3.5 text-[13px]",
                      on
                        ? "border-gold bg-gold-tint font-semibold text-gold"
                        : "border-stone-200 bg-white text-stone-700 hover:bg-stone-50",
                    )}
                  >
                    {on ? "Added ✓" : "Add to trip"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
