"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-reveal for [data-reveal] elements: .55s rise, 70ms stagger between
 * siblings (max 5). Content is visible without JS; reduced motion skips it.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const sibs = el.parentElement
            ? Array.from(el.parentElement.children).filter((c) => c.hasAttribute("data-reveal"))
            : [];
          const i = Math.min(sibs.indexOf(el), 5);
          el.style.animation = "var(--animate-reveal-up)";
          el.style.animationDelay = (i > 0 ? i * 70 : 0) + "ms";
          el.setAttribute("data-revealed", "");
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );

    const scan = () =>
      document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    scan();
    root.classList.add("reveal-ready");
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
