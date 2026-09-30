import { SignUp } from "@clerk/nextjs";
import { notFound } from "next/navigation";

import { clerkEnabled } from "@/lib/clerk";

export default function SignUpPage() {
  if (!clerkEnabled) notFound();
  return (
    <main className="flex justify-center px-4 py-16">
      <SignUp />
    </main>
  );
}
