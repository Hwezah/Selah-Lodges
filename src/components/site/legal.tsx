import type { ReactNode } from "react";

import { Container, Eyebrow } from "@/components/site/ui";

/** Shared layout for the privacy policy and terms: centred intro, then the text in a white card. */
export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <main>
      <Container className="pt-[clamp(28px,5vw,48px)] pb-24">
        <div data-m-center className="mx-auto max-w-[760px]">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display mt-3 text-[clamp(28px,5.4vw,52px)] tracking-[-.02em]">{title}</h1>
          <p className="mt-3 text-[13.5px] text-stone-500">Last updated {updated}</p>
          <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-stone-700">{intro}</p>
        </div>
        <div className="mx-auto mt-8 max-w-[760px] rounded-[18px] border border-stone-200 bg-white p-[clamp(18px,4vw,40px)] text-[15px] leading-[1.75] text-stone-700 [&_a]:font-medium [&_a]:text-gold [&_a:hover]:text-gold-hover [&_h2]:font-display [&_h2]:mt-9 [&_h2]:mb-2.5 [&_h2]:text-[22px] [&_h2]:text-stone-900 [&_h2:first-child]:mt-0 [&_li]:mt-1.5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </Container>
    </main>
  );
}
