"use client";

import type { ReactNode } from "react";

import { LightboxProvider } from "@/components/site/lightbox";
import { AuthProvider } from "@/context/auth-context";
import { BookingProvider } from "@/context/booking-context";
import { UIProvider } from "@/context/ui-context";

// Compose client-side context providers here as the app grows.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <UIProvider>
      <AuthProvider>
        <BookingProvider>
          <LightboxProvider>{children}</LightboxProvider>
        </BookingProvider>
      </AuthProvider>
    </UIProvider>
  );
}
