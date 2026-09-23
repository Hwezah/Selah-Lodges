"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BookingDraft = {
  lodgeId: string | null;
  checkIn: string | null;
  checkOut: string | null;
  guests: number;
};

type BookingContextValue = {
  booking: BookingDraft;
  updateBooking: (patch: Partial<BookingDraft>) => void;
  resetBooking: () => void;
};

const initialBooking: BookingDraft = {
  lodgeId: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingDraft>(initialBooking);

  const updateBooking = useCallback((patch: Partial<BookingDraft>) => {
    setBooking((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetBooking = useCallback(() => setBooking(initialBooking), []);

  const value = useMemo(
    () => ({ booking, updateBooking, resetBooking }),
    [booking, updateBooking, resetBooking]
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return ctx;
}
