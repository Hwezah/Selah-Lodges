import "server-only";

import { currentUser } from "@clerk/nextjs/server";

import { clerkEnabled } from "@/lib/clerk";

/**
 * A user is an admin when their Clerk public metadata has { "role": "admin" }
 * (set it in the Clerk dashboard), or their email is listed in ADMIN_EMAILS.
 */
export async function isAdmin(): Promise<boolean> {
  if (!clerkEnabled) return false;
  const user = await currentUser();
  if (!user) return false;
  if ((user.publicMetadata as { role?: string } | undefined)?.role === "admin") return true;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return user.emailAddresses.some((e) => allow.includes(e.emailAddress.toLowerCase()));
}
