import type { Metadata } from "next";
import Image from "next/image";

import { Container, Eyebrow } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Brand assets",
  description: "Download the Selah Lodges logo.",
  robots: { index: false },
};

const FILES = [
  { src: "/brand/selah-logo-transparent-1024.png", size: "1024 × 1024", note: "Transparent · print and large use", bg: "checker" },
  { src: "/brand/selah-logo-transparent-512.png", size: "512 × 512", note: "Transparent · social and web", bg: "checker" },
  { src: "/brand/selah-logo-transparent-120.png", size: "120 × 120", note: "Transparent · small icons", bg: "checker" },
  { src: "/brand/selah-logo-120.png", size: "120 × 120", note: "Cream background · Google sign-in", bg: "cream" },
] as const;

// A light checkerboard shows which logos are transparent.
const checker = {
  backgroundColor: "#fff",
  backgroundImage:
    "linear-gradient(45deg,#ece9e3 25%,transparent 25%),linear-gradient(-45deg,#ece9e3 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#ece9e3 75%),linear-gradient(-45deg,transparent 75%,#ece9e3 75%)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0,0 10px,10px -10px,-10px 0",
};

export default function BrandPage() {
  return (
    <main>
      <Container className="pt-[clamp(28px,5vw,48px)] pb-24">
        <div data-m-center>
          <Eyebrow>Brand assets</Eyebrow>
          <h1 className="font-display mt-3 text-[clamp(28px,5.4vw,52px)] tracking-[-.02em]">Selah Lodges logo</h1>
          <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7] text-stone-700">
            The gold Selah mark as PNG files. Tap a download button to save one.
          </p>
        </div>
        <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))] gap-5">
          {FILES.map((f) => (
            <div key={f.src} className="overflow-hidden rounded-[18px] border border-stone-200 bg-white">
              <div
                className="grid aspect-square place-items-center"
                style={f.bg === "checker" ? checker : { backgroundColor: "#FAF7F1" }}
              >
                <Image src={f.src} alt="Selah Lodges logo" width={180} height={180} unoptimized className="size-[60%] object-contain" />
              </div>
              <div className="p-4">
                <div className="text-[15px] font-medium">{f.size} PNG</div>
                <div className="mt-0.5 text-[13px] text-stone-500">{f.note}</div>
                <a
                  href={f.src}
                  download
                  className="mt-4 flex h-11 items-center justify-center gap-2 rounded-xl bg-gold text-[14.5px] font-medium text-stone-50 hover:bg-gold-hover hover:text-stone-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 4v11" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 20h14" />
                  </svg>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
