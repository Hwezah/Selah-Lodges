import type { Metadata } from "next";

import { Checkout } from "@/components/booking/checkout";

export const metadata: Metadata = { title: "Confirm and pay", robots: { index: false } };

export default function CheckoutPage() {
  return <Checkout />;
}
