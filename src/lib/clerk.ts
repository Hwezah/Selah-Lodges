/**
 * Clerk auth switches on once NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set (with
 * CLERK_SECRET_KEY on the server). Without keys the site still works: the
 * account menu says sign-in is coming soon and /admin stays locked.
 */
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
