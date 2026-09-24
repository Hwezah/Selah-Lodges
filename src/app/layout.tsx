import type { Metadata, Viewport } from "next";
import { Jost, Marcellus } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
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
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#B9975B",
          colorForeground: "#1C1917",
          colorMutedForeground: "#78716C",
          fontFamily: "var(--font-jost), system-ui, sans-serif",
          borderRadius: "0.75rem",
        },
      }}
    >
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
    </ClerkProvider>
  );
}
