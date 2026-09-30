/**
 * Supabase Auth switches on once the project URL and publishable (anon) key
 * are set. Without them the site still works: the account menu says sign-in
 * is coming soon and /admin stays locked.
 */
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabaseEnabled = Boolean(supabaseUrl && supabaseKey);

/** Only allow same-site relative paths as post-auth redirects. */
export function safeNext(next: string | null | undefined, fallback = "/"): string {
  return next && next.startsWith("/") && !next.startsWith("//") ? next : fallback;
}
