import type { Metadata, Viewport } from "next";
import { Jost, Marcellus } from "next/font/google";

import { BookBar, ShellPadding } from "@/components/site/book-bar";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { RevealObserver } from "@/components/site/reveal-observer";
import { Toaster } from "@/components/site/toaster";
import { AppProviders } from "@/context/app-providers";
import "./globals.css";

const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });
const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: "400" });

const description =
  "Beautifully furnished one-bed serviced apartments in Komamboga | Kyanja, Kampala. A sanctuary to reflect, reset and rise.";

// Absolute base for Open Graph URLs. Blank env vars are skipped, and on Vercel
// the deployment's own domain is used when NEXT_PUBLIC_SITE_URL isn't set.
function siteUrl(): URL {
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, vercel && `https://${vercel}`, "http://localhost:3000"];
  for (const c of candidates) {
    if (!c?.trim()) continue;
    try {
      return new URL(c.trim());
    } catch {
      // Ignore malformed values and try the next option.
    }
  }
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: siteUrl(),
  title: { default: "Selah Lodges · Serviced apartments in Kyanja, Kampala", template: "%s · Selah Lodges" },
  description,
  openGraph: {
    title: "Selah Lodges",
    description,
    siteName: "Selah Lodges",
    type: "website",
    images: [{ url: "/images/hero-living.jpg", width: 1024, height: 768, alt: "Selah Lodges living room" }],
  },
  twitter: { card: "summary_large_image", title: "Selah Lodges", description, images: ["/images/hero-living.jpg"] },
};

export const viewport: Viewport = { themeColor: "#B9975B" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${marcellus.variable}`}>
      <body>
        <AppProviders>
          <ShellPadding>
            <SiteHeader />
            <div className="flex flex-1 flex-col">{children}</div>
            <SiteFooter />
          </ShellPadding>
          <BookBar />
          <Toaster />
          <RevealObserver />
        </AppProviders>
      </body>
    </html>
  );
}
