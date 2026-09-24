import type { Order } from "@/context/booking-context";

const stamp = (iso: string) => iso.replace(/-/g, "");

/** Download an all-day calendar event covering the stay. */
export function downloadIcs(order: Order) {
  if (!order.checkIn || !order.checkOut) return;
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Selah Lodges//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${order.ref}@selahlodges.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;VALUE=DATE:${stamp(order.checkIn)}`,
    `DTEND;VALUE=DATE:${stamp(order.checkOut)}`,
    `SUMMARY:Selah Lodges · ${order.apartment}`,
    "LOCATION:Komamboga | Kyanja\\, Kampala",
    `DESCRIPTION:Booking ${order.ref}. Check in after 2pm\\, check out by 11am. +256 776 401 100`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `selah-${order.ref}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}
