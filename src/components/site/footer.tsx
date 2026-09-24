import Link from "next/link";

import { NAV_ITEMS } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-[18px] px-[clamp(16px,4vw,24px)] py-[clamp(28px,5vw,44px)] text-center">
        <div className="font-display text-xl">Selah Lodges</div>
        <div className="flex flex-wrap items-center justify-center gap-5 text-[13.5px] text-stone-500">
          {NAV_ITEMS.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-stone-900">
              {n.label}
            </Link>
          ))}
          <span>© 2026 Selah Lodges</span>
        </div>
      </div>
    </footer>
  );
}
