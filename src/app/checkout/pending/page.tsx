import type { Metadata } from "next";

import { PendingClaim } from "@/components/booking/pending";

export const metadata: Metadata = { title: "Booking pending", robots: { index: false } };

export default function PendingPage() {
  return <PendingClaim />;
}
