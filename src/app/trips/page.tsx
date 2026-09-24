import type { Metadata } from "next";

import { Trips } from "@/components/booking/trips";

export const metadata: Metadata = { title: "Your trips", robots: { index: false } };

export default function TripsPage() {
  return <Trips />;
}
