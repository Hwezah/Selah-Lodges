"use client";

import { useBooking } from "@/context/booking-context";

export function PriceRows() {
  const { totals: t, money, cartItems } = useBooking();
  const rows = [
    { label: `${money(t.price)} × ${t.n} ${t.n === 1 ? "night" : "nights"}`, value: money(t.stay) },
    { label: "Cleaning fee", value: money(t.clean) },
    { label: "Service fee", value: money(t.service) },
    { label: "Occupancy tax", value: money(t.tax) },
    ...(cartItems.length ? [{ label: `Trip extras (${cartItems.length})`, value: "Quoted on booking" }] : []),
  ];
  return (
    <div className="grid gap-2.5">
      {rows.map((r) => (
        <div key={r.label} className="flex justify-between gap-3 text-sm text-stone-600">
          <span>{r.label}</span>
          <span className="text-right">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
