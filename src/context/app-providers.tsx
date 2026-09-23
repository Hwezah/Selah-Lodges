"use client";

import type { ReactNode } from "react";

import { BookingProvider } from "@/context/booking-context";

// Compose client-side context providers here as the app grows.
export function AppProviders({ children }: { children: ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
