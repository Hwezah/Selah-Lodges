import { CONFIG, type Apartment } from "@/lib/data";

export type Currency = "USD" | "UGX";

const DAY = 86_400_000;
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** USD amounts shown as dollars, or shillings rounded to the nearest 1,000. */
export function money(n: number, cur: Currency): string {
  if (cur === "UGX") {
    return "USh " + (Math.round((n * CONFIG.ugxRate) / 1000) * 1000).toLocaleString("en-US");
  }
  return "$" + Math.round(n).toLocaleString("en-US");
}

/** Local-date ISO string (YYYY-MM-DD) — avoids the UTC shift of toISOString. */
export function isoDate(d: Date): string {
  return (
    d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0")
  );
}

export function fmtDate(iso: string | null | undefined, long = false): string | null {
  if (!iso) return null;
  const d = new Date(iso + "T00:00:00");
  const m = MONTHS[d.getMonth()].slice(0, 3);
  return long ? `${m} ${d.getDate()}, ${d.getFullYear()}` : `${m} ${d.getDate()}`;
}

export function nightsBetween(checkIn: string | null, checkOut: string | null): number {
  if (!checkIn || !checkOut) return 0;
  return Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / DAY));
}

export type Totals = {
  n: number;
  price: number;
  stay: number;
  clean: number;
  service: number;
  tax: number;
  total: number;
};

/** Nightly × nights + cleaning fee + service fee + occupancy tax (on stay + cleaning). */
export function totals(apartment: Apartment, checkIn: string | null, checkOut: string | null): Totals {
  const n = nightsBetween(checkIn, checkOut);
  const stay = apartment.price * n;
  const clean = n ? CONFIG.cleaningFee : 0;
  const service = Math.round(stay * (CONFIG.serviceFeePct / 100));
  const tax = Math.round((stay + clean) * (CONFIG.taxPct / 100));
  return { n, price: apartment.price, stay, clean, service, tax, total: stay + clean + service + tax };
}

export function datesLabel(checkIn: string | null, checkOut: string | null): string {
  if (checkIn && checkOut) return `${fmtDate(checkIn)} – ${fmtDate(checkOut)}`;
  if (checkIn) return `${fmtDate(checkIn)} – add checkout`;
  return "Add dates";
}

export function guestsLabel(n: number): string {
  return n + (n === 1 ? " guest" : " guests");
}

/**
 * Placeholder availability: a fixed pattern of blocked days.
 * TODO: replace with booked/blocked dates from the database.
 */
export function isBlocked(day: number): boolean {
  return CONFIG.showBlockedDates && (day % 17 === 3 || day % 23 === 7);
}

export type CalDay =
  | { kind: "blank"; key: string }
  | {
      kind: "day";
      key: string;
      iso: string;
      label: string;
      disabled: boolean;
      blocked: boolean;
      selected: boolean;
      inRange: boolean;
    };

export function calendarDays(
  view: { y: number; m: number },
  today: string,
  checkIn: string | null,
  checkOut: string | null,
): CalDay[] {
  const lead = new Date(view.y, view.m, 1).getDay();
  const count = new Date(view.y, view.m + 1, 0).getDate();
  const out: CalDay[] = [];
  for (let i = 0; i < lead; i++) out.push({ kind: "blank", key: "b" + i });
  for (let d = 1; d <= count; d++) {
    const iso = `${view.y}-${String(view.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const past = iso < today;
    const blocked = !past && isBlocked(d);
    out.push({
      kind: "day",
      key: iso,
      iso,
      label: String(d),
      disabled: past || blocked,
      blocked,
      selected: iso === checkIn || iso === checkOut,
      inRange: !!(checkIn && checkOut && iso > checkIn && iso < checkOut),
    });
  }
  return out;
}

/** Normalise a Ugandan phone number to +256 international format. */
export function intlPhone(v: string): string {
  const d = String(v || "").replace(/[^0-9]/g, "");
  if (!d) return "";
  if (d.startsWith("256")) return "+" + d;
  return "+256" + d.replace(/^0+/, "");
}

export function whatsappUrl(lines: (string | null | undefined | false)[]): string {
  const num = CONFIG.adminWhatsApp.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
}

export function bookingRef(): string {
  return "SL-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}
