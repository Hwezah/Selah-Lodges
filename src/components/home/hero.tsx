"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PhotoButton } from "@/components/site/lightbox";
import { HOME_PHOTOS } from "@/lib/data";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/images/hero-living.jpg", alt: "Selah Lodges living room" },
  { src: "/images/room1-bedroom.jpg", alt: "Bedroom" },
  { src: "/images/room1-living.jpg", alt: "One-Bed Apartment 1 living room" },
  { src: "/images/room2-kitchen.jpg", alt: "Kitchen and dining nook" },
  { src: "/images/hero-balcony.jpg", alt: "Balcony" },
];

const HOLD_MS = 5500;

/**
 * Full-bleed home hero: room photos crossfade with a slow zoom behind the
 * headline and calls to action. 80% of the screen height on phones (portrait),
 * full height on wider screens. The next photo is mounted ahead of time so each
 * change is a smooth fade, never a blank frame.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const count = SLIDES.length;

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), HOLD_MS);
    return () => clearTimeout(t);
  }, [index, count]);

  return (
    <section
      aria-label="Welcome to Selah Lodges"
      className="relative isolate flex h-[80svh] min-h-[520px] flex-col justify-end overflow-hidden bg-stone-900 text-stone-50 sm:h-svh"
    >
      {SLIDES.map((s, i) => {
        const active = i === index;
        const next = i === (index + 1) % count;
        const prev = i === (index - 1 + count) % count;
        if (!active && !next && !prev) return null;
        return (
          <div
            key={s.src}
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 -z-10 transition-opacity duration-[1400ms] ease-in-out",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={s.src}
              alt={active ? s.alt : ""}
              fill
              priority={i === 0}
              sizes="100vw"
              className={cn(
                "object-cover will-change-transform motion-safe:transition-transform motion-safe:ease-linear",
                // The zoom keeps running through the fade-out so motion never stalls.
                active || prev ? "scale-110 motion-safe:duration-[7000ms]" : "scale-100 duration-0",
              )}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-stone-900/80 via-stone-900/35 to-stone-900/25 lg:bg-gradient-to-r lg:from-stone-900/70 lg:via-stone-900/35 lg:to-stone-900/10" />

      <div className="mx-auto w-full max-w-[1400px] px-[clamp(16px,4vw,24px)] pb-[clamp(28px,4vw,44px)]">
        <div className="text-[11.5px] font-semibold uppercase tracking-[.14em] text-stone-50/85 sm:text-xs">
          Selah Lodges · Komamboga | Kyanja, Kampala
        </div>
        <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(38px,7vw,96px)] leading-[1.02] tracking-[-.02em] text-pretty">
          A sanctuary to reflect, reset and rise.
        </h1>
      </div>

      <div className="h-px w-full bg-stone-50/35" />

      <div className="mx-auto w-full max-w-[1400px] px-[clamp(16px,4vw,24px)] pt-[clamp(20px,3vw,32px)] pb-[clamp(28px,6vw,96px)]">
        <p className="max-w-[48ch] text-[15px] leading-[1.6] text-stone-50/90 sm:text-[17px]">
          Beautifully furnished one-bed apartments — modern design in serene surroundings, 30 minutes from Kampala.
        </p>
        {/* Always one row: shorter labels on phones in portrait so both CTAs fit. */}
        <div className="mt-6 flex flex-nowrap items-center gap-3 whitespace-nowrap sm:mt-8 sm:gap-4">
          <Link
            href="/#stays"
            className="inline-flex h-[52px] flex-none items-center gap-2.5 rounded-full bg-white px-5 text-[15px] font-medium text-stone-900 shadow-[0_10px_30px_-12px_rgba(0,0,0,.5)] transition-colors hover:bg-gold-tint hover:text-stone-900 sm:h-14 sm:px-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
            <span className="sm:hidden">Book now</span>
            <span className="hidden sm:inline">Book a room</span>
          </Link>
          <span className="font-display text-[15px] italic text-stone-50/70">or</span>
          <Link
            href="/services"
            aria-label="Explore services"
            className="min-w-0 border-b border-stone-50/60 pb-1 text-[12.5px] font-medium uppercase tracking-[.14em] text-stone-50 hover:border-stone-50 hover:text-stone-50"
          >
            <span className="sm:hidden">Services</span>
            <span className="hidden sm:inline">Explore services</span>
          </Link>
        </div>
      </div>

      <div className="absolute top-4 right-[clamp(16px,4vw,24px)] flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          {SLIDES.map((s, i) => (
            <span
              key={s.src}
              className={cn("h-1 rounded-full bg-stone-50 transition-all duration-500", i === index ? "w-5" : "w-1.5 opacity-50")}
            />
          ))}
        </div>
        <PhotoButton
          album={HOME_PHOTOS}
          label="View photos"
          className="rounded-full bg-stone-900/40 px-3 py-1.5 text-[12px] font-medium text-stone-50 backdrop-blur-sm hover:bg-stone-900/60"
        >
          View photos
        </PhotoButton>
      </div>
    </section>
  );
}
