import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { SiteHeader } from "@/components/layout/site-header";
import { AppProviders } from "@/context/app-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selah Lodges",
  description: "Find rest. Book your stay at Selah Lodges.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <AppProviders>
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
