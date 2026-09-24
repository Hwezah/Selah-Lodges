"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { ChevronLeft } from "@/components/site/icon";
import { useBooking } from "@/context/booking-context";
import type { Currency } from "@/lib/booking";
import { cn } from "@/lib/utils";

/** Page-width container: 1400px max, fluid side padding. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-[clamp(16px,4vw,24px)]", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("text-xs font-semibold uppercase tracking-[.08em] text-gold", className)} {...props} />
  );
}

export function FieldLabel({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("text-[11px] font-semibold uppercase tracking-[.06em] text-stone-500", className)}
      {...props}
    />
  );
}

/** Underlined filter tabs (apartment and services filters). */
export function Tabs<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-full min-w-0 flex-wrap justify-center gap-[18px]", className)}>
      {options.map((o) => {
        const on = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={on}
            className={cn(
              "h-[34px] border-b-2 px-1 text-[13px]",
              on ? "border-gold font-semibold text-gold" : "border-transparent text-stone-500 hover:text-stone-800",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function CurrencyToggle() {
  const { currency, setCurrency } = useBooking();
  const opts: { c: Currency; label: string }[] = [
    { c: "USD", label: "USD $" },
    { c: "UGX", label: "UGX USh" },
  ];
  return (
    <div className="flex flex-none gap-1 rounded-[9px] bg-stone-100 p-[3px]" role="group" aria-label="Currency">
      {opts.map(({ c, label }) => (
        <button
          key={c}
          type="button"
          aria-pressed={currency === c}
          onClick={(e) => {
            e.stopPropagation();
            setCurrency(c);
          }}
          className={cn(
            "h-[26px] whitespace-nowrap rounded-[7px] px-[9px] text-[11.5px]",
            currency === c ? "bg-white font-semibold text-stone-900 shadow-[0_1px_2px_rgba(28,25,23,.1)]" : "text-stone-500",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function StepperButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(
        "grid size-7 place-items-center rounded-full border border-stone-200 bg-white leading-none text-stone-700 hover:bg-stone-100",
        className,
      )}
      {...props}
    />
  );
}

export function GuestStepper({ size = "sm" }: { size?: "sm" | "lg" }) {
  const { incGuests, decGuests } = useBooking();
  const cls = size === "lg" ? "size-[38px] text-[17px]" : "";
  return (
    <div className="flex flex-none gap-1.5">
      <StepperButton className={cls} onClick={decGuests} aria-label="Fewer guests">
        −
      </StepperButton>
      <StepperButton className={cls} onClick={incGuests} aria-label="More guests">
        +
      </StepperButton>
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-[7px] whitespace-nowrap text-[13.5px] text-stone-600 hover:text-gold"
    >
      <ChevronLeft />
      {children}
    </Link>
  );
}

export function StatusBadge({ status }: { status: "pending" | "confirmed" | "declined" | "cancelled" }) {
  const styles = {
    pending: "bg-amber-100 text-amber-800",
    confirmed: "bg-gold-tint text-gold",
    declined: "bg-red-50 text-red-700",
    cancelled: "bg-stone-100 text-stone-500",
  }[status];
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full px-[9px] py-[5px] text-[11px] font-semibold uppercase tracking-[.06em]",
        styles,
      )}
    >
      {status}
    </span>
  );
}
