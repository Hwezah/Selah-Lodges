"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";

import { useBooking } from "@/context/booking-context";
import { useUI } from "@/context/ui-context";
import { APARTMENTS, NAV_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const iconBtn =
  "relative grid h-[38px] w-[clamp(30px,8vw,38px)] flex-none place-items-center text-stone-700 hover:text-gold";
const panelCls =
  "absolute right-0 top-[46px] z-50 animate-sheet-in overflow-hidden rounded-[14px] border border-stone-200 bg-white shadow-panel";

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/" || pathname.startsWith("/apartments") || pathname.startsWith("/checkout");
  return pathname.startsWith(href);
}

function timeAgo(at: number) {
  const s = Math.round((Date.now() - at) / 1000);
  if (s < 60) return "Just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.round(m / 60);
  return h < 24 ? `${h} hour${h === 1 ? "" : "s"} ago` : "Yesterday";
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/85 backdrop-blur-md">
      <div className="mx-auto flex min-h-[68px] max-w-[1400px] items-center gap-[clamp(10px,2vw,28px)] px-[clamp(14px,3vw,24px)]">
        <Link href="/" className="mr-1 flex min-w-0 items-center gap-[9px] text-stone-900 hover:text-stone-900">
          <Image src="/images/selah-mark.png" alt="" width={26} height={26} className="size-[26px] object-contain" priority />
          <span className="font-display whitespace-nowrap text-[clamp(17px,3.4vw,22px)] tracking-[-.01em]">
            Selah Lodges
          </span>
        </Link>

        <nav className="ml-auto hidden flex-nowrap gap-1.5 overflow-hidden xl:flex" aria-label="Main">
          {NAV_ITEMS.map((n) => {
            const on = isActive(n.href, pathname);
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "flex h-[34px] items-center border-b-2 px-2.5 text-sm",
                  on ? "border-gold font-semibold text-gold" : "border-transparent text-stone-600 hover:text-stone-900",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex flex-none items-center gap-[clamp(2px,1.5vw,10px)]">
          <CartMenu />
          <NotificationsMenu />
          <Link
            href="/#stays"
            className="hidden h-[38px] flex-none items-center whitespace-nowrap rounded-[10px] bg-gold px-[clamp(12px,3vw,16px)] text-[13.5px] font-medium text-stone-50 hover:bg-gold-hover hover:text-stone-50 sm:inline-flex"
          >
            <span className="md:hidden">Book</span>
            <span className="hidden md:inline">Book a stay</span>
          </Link>
          <Drawer />
        </div>
      </div>
    </header>
  );
}


function CartMenu() {
  const { panel, togglePanel, closePanels, openPanel, openPanelAfterNav, toast } = useUI();
  const { cartItems, toggleCartItem, checkIn, checkOut } = useBooking();
  const router = useRouter();
  const pathname = usePathname();
  const open = panel === "cart";
  const count = cartItems.length;

  const checkout = () => {
    closePanels();
    if (!checkIn || !checkOut) {
      toast("warn", "Add your dates", "Pick check-in and check-out, then we'll add the extras to your booking.");
      if (pathname === "/") {
        openPanel("cal-hero");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        openPanelAfterNav("cal-hero");
        router.push("/");
      }
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className={cn("relative flex-none", count ? "block" : "hidden xs:block")} data-keep-open>
      <button type="button" onClick={() => togglePanel("cart")} aria-label="Your trip extras" aria-expanded={open} className={iconBtn}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4h1.8l2 10.2h11L20 7H5.4" />
          <circle cx="9" cy="19.2" r="1.5" />
          <circle cx="17.2" cy="19.2" r="1.5" />
        </svg>
        {count > 0 && (
          <span className="absolute -top-[3px] -right-1 grid h-[17px] min-w-[17px] place-items-center rounded-full border-2 border-stone-50 bg-gold px-1 text-[10.5px] font-bold text-stone-50">
            {count}
          </span>
        )}
      </button>
      {open && (
        <div className={cn(panelCls, "w-[min(340px,calc(100vw-28px))]")}>
          <div className="border-b border-stone-100 px-4 py-3.5 text-[13px] font-semibold">Your trip extras</div>
          {count === 0 && (
            <div className="px-4 py-[22px] text-[13.5px] leading-[1.55] text-stone-500">
              Nothing added yet. Browse Services to add laundry, cleaning or a car wash to your stay.
            </div>
          )}
          {cartItems.map((c) => (
            <div key={c.title} className="flex items-start gap-2.5 border-b border-stone-100 px-4 py-[13px]">
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-medium leading-[1.35]">{c.title}</div>
                <div className="mt-[3px] text-[12.5px] text-stone-500">
                  {c.cat} · {c.meta}
                </div>
              </div>
              <div className="whitespace-nowrap text-[13px] font-semibold">{c.price}</div>
              <button
                type="button"
                onClick={() => toggleCartItem(c.title)}
                aria-label={`Remove ${c.title}`}
                className="px-0.5 text-[15px] leading-none text-stone-400 hover:text-stone-900"
              >
                ×
              </button>
            </div>
          ))}
          <div className="grid gap-2.5 px-4 py-3.5">
            <div className="flex justify-between gap-3 text-[13px] text-stone-600">
              <span>Extras subtotal</span>
              <span className="text-right font-semibold text-stone-900">Quoted on booking</span>
            </div>
            <button
              type="button"
              onClick={checkout}
              className="h-10 rounded-[10px] bg-gold text-[13.5px] font-medium text-stone-50 hover:bg-gold-hover"
            >
              Go to checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationsMenu() {
  const { panel, togglePanel, notifications, unreadCount, markAllRead, closePanels } = useUI();
  const router = useRouter();
  const open = panel === "notif";

  return (
    <div className="relative flex-none" data-keep-open>
      <button type="button" onClick={() => togglePanel("notif")} aria-label="Notifications" aria-expanded={open} className={iconBtn}>
        <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8.5A6 6 0 1 0 6 8.5c0 6.5-2.8 8.4-2.8 8.4h17.6S18 15 18 8.5" />
          <path d="M13.8 20.4a2.1 2.1 0 0 1-3.6 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-[5px] right-1.5 size-2 rounded-full border-2 border-stone-50 bg-orange-700" />
        )}
      </button>
      {open && (
        <div
          className={cn(
            "fixed top-[72px] left-1/2 z-90 max-h-[calc(100vh-96px)] w-[min(360px,calc(100vw-24px))] -translate-x-1/2 animate-sheet-in overflow-y-auto rounded-[14px] border border-stone-200 bg-white shadow-panel",
            "sm:absolute sm:top-[46px] sm:right-0 sm:left-auto sm:z-50 sm:max-h-none sm:w-[min(336px,calc(100vw-28px))] sm:translate-x-0 sm:overflow-hidden",
          )}
        >
          <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3.5">
            <span className="text-[13px] font-semibold">Notifications</span>
            <button type="button" onClick={markAllRead} className="text-xs text-gold">
              Mark all read
            </button>
          </div>
          {notifications.length === 0 && (
            <div className="px-4 py-[22px] text-[13.5px] text-stone-500">You&apos;re all caught up.</div>
          )}
          {notifications.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                closePanels();
                router.push("/trips");
              }}
              className={cn(
                "flex w-full gap-[11px] px-4 py-[13px] text-left",
                i < notifications.length - 1 && "border-b border-stone-100",
                n.unread ? "bg-stone-50" : "bg-white",
              )}
            >
              <span className={cn("mt-1.5 size-[7px] flex-none rounded-full", n.unread ? "bg-gold" : "bg-stone-200")} />
              <span className="min-w-0">
                <span className="block text-[13px] font-medium leading-[1.35]">{n.title}</span>
                <span className="mt-0.5 block text-[12.5px] leading-[1.45] text-stone-500">{n.body}</span>
                <span className="mt-[5px] block text-[11.5px] text-stone-400">{timeAgo(n.at)}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Drawer() {
  const { panel, togglePanel, closePanels } = useUI();
  const { money } = useBooking();
  const open = panel === "drawer";

  return (
    <div className="flex-none" data-keep-open>
      <button
        type="button"
        onClick={() => togglePanel("drawer")}
        aria-label="About Selah Lodges"
        aria-expanded={open}
        className="ml-[clamp(2px,1vw,8px)] grid h-11 w-[clamp(34px,8vw,70px)] flex-none place-items-center text-stone-700 hover:text-gold"
      >
        <svg width="100%" height="26" viewBox="0 0 66 26" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="0.9">
          <path d="M0 7h66" vectorEffect="non-scaling-stroke" />
          <path d="M0 19h66" vectorEffect="non-scaling-stroke" />
        </svg>
      </button>
      {open &&
        createPortal(
        <div
          data-keep-open
          role="dialog"
          aria-label="Selah Lodges"
          className="fixed top-0 right-0 z-80 h-screen w-screen max-w-screen animate-sheet-in overflow-y-auto bg-gold px-[clamp(20px,5vw,34px)] pt-[clamp(22px,5vw,36px)] pb-[100px] text-stone-50 shadow-[-24px_0_60px_-20px_rgba(28,25,23,.45)] sm:w-[min(560px,max(35vw,320px))]"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-display whitespace-nowrap text-[26px]">Selah Lodges</span>
            <button
              type="button"
              onClick={closePanels}
              aria-label="Close"
              className="-mt-1.5 -mr-2 grid size-11 flex-none place-items-center text-stone-50 hover:text-gold-soft"
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="0.9">
                <path d="M6 6 34 34" />
                <path d="M34 6 6 34" />
              </svg>
            </button>
          </div>

          <nav className="mt-[30px] grid gap-0.5 xl:hidden" aria-label="Menu">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={closePanels}
                className="font-display py-2.5 text-[27px] text-stone-50 hover:text-gold-soft"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:block">
            <div className="mt-[30px] text-[11px] font-semibold uppercase tracking-[.08em] text-gold-soft">
              Jump to an apartment
            </div>
            <div className="mt-2.5 grid">
              {APARTMENTS.map((a) => (
                <Link
                  key={a.id}
                  href={`/apartments/${a.id}`}
                  onClick={closePanels}
                  className="flex w-full items-baseline justify-between gap-3.5 border-b border-stone-50/15 py-[13px] text-stone-50 hover:text-gold-soft"
                >
                  <span className="min-w-0">
                    <span className="font-display block text-[21px] leading-[1.25]">{a.name}</span>
                    <span className="mt-[3px] block text-[12.5px] text-[#EFE6D6]">{a.sleeps}</span>
                  </span>
                  <span className="whitespace-nowrap text-[13.5px] font-semibold">{money(a.price)} / night</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="my-[30px] h-px bg-stone-50/20" />
          <div className="text-[11px] font-semibold uppercase tracking-[.08em] text-gold-soft">Where we are</div>
          <div className="mt-[9px] text-base font-medium">Komamboga | Kyanja proximity, Kampala</div>
          <div className="mt-1.5 text-sm leading-[1.6] text-[#EFE6D6]">
            Just a 30-minute drive from Kampala City, even with traffic — the perfect escape from the hustle and bustle.
          </div>
          <div className="mt-[26px] text-[14.5px] leading-[1.7] text-gold-tint">
            Selah Lodges is a quiet sanctuary in Komamboga–Kyanja, created for those seeking stillness, clarity and
            renewal. More than a place to stay — a space to pause, breathe, and come back to yourself.
          </div>
          <div className="mt-7 grid gap-1.5">
            <a href="tel:+256776401100" onClick={() => togglePanel("drawer")} className="text-[15px] text-stone-50">
              +256 776 401 100
            </a>
            <a href="mailto:reservations@selahlodges.com" onClick={() => togglePanel("drawer")} className="text-[15px] text-stone-50">
              reservations@selahlodges.com
            </a>
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
