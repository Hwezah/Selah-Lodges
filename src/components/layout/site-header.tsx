import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Selah Lodges
        </Link>
        <nav className="flex items-center gap-2">
          <Show when="signed-out">
            <SignInButton>
              <Button variant="ghost">Sign in</Button>
            </SignInButton>
            <SignUpButton>
              <Button>Sign up</Button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton />
          </Show>
        </nav>
      </div>
    </header>
  );
}
