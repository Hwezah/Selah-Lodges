import type { Metadata } from "next";

import { BookingDone } from "@/components/booking/done";

export const metadata: Metadata = { title: "You're booked", robots: { index: false } };

export default function DonePage() {
  return <BookingDone />;
}
