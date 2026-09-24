"use client";

import type { ReactNode } from "react";

import { BookingProvider } from "@/context/booking-context";
import { UIProvider } from "@/context/ui-context";

// Compose client-side context providers here as the app grows.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <BookingProvider>{children}</BookingProvider>
    </UIProvider>
  );
}
