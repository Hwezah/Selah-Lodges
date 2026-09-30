import { SignIn } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import { clerkEnabled } from "@/lib/clerk";

export default function SignInPage() {
  if (!clerkEnabled) notFound();
  return (
    <main className="flex justify-center px-4 py-16">
      <SignIn />
    </main>
  );
}
