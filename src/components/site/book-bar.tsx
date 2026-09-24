"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useUI } from "@/context/ui-context";
import { cn } from "@/lib/utils";

/** The mobile book bar shows everywhere except the checkout flow. */
export function showsBookBar(pathname: string) {
  return !pathname.startsWith("/checkout");
}

/** Sticky bottom "Book a room" bar, mobile portrait only (< 640px). */
export function BookBar() {
  const pathname = usePathname();
  const { panel } = useUI();
  if (!showsBookBar(pathname)) return null;
  const gold = panel === "drawer";

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-85 border-t px-3.5 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden",
        gold ? "border-stone-50/20 bg-gold" : "border-stone-200 bg-stone-50/95",
      )}
      data-keep-open
    >
      <Link
        href="/#stays"
        className={cn(
          "flex min-h-12 w-full items-center justify-center rounded-xl text-[15px] font-medium",
          gold ? "bg-stone-50 text-gold" : "bg-gold text-stone-50",
        )}
      >
        {pathname === "/" ? "Book a room" : "Back to rooms"}
      </Link>
    </div>
  );
}

/** Adds bottom padding so the fixed book bar never covers page content. */
export function ShellPadding({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className={cn("flex min-h-screen flex-col", showsBookBar(pathname) && "pb-[84px] sm:pb-0")}>{children}</div>
  );
}
