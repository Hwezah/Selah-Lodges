import "server-only";

import { createServerClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { supabaseEnabled, supabaseKey, supabaseUrl } from "@/lib/supabase/config";

/** Server Supabase client bound to the request cookies (create one per request). */
export async function getSupabaseServer() {
  if (!supabaseEnabled) return null;
  const store = await cookies();
  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component, where cookies are read-only; the proxy refreshes sessions.
        }
      },
    },
  });
}

/** The signed-in user, verified with the Supabase Auth server. */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await getSupabaseServer();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

/**
 * Admins have app_metadata.role = "admin" (only settable server-side, e.g. via
 * SQL in the Supabase dashboard) or an email listed in ADMIN_EMAILS.
 */
export function userIsAdmin(user: User | null): boolean {
  if (!user) return false;
  if ((user.app_metadata as { role?: string } | undefined)?.role === "admin") return true;
  const allow = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return !!user.email && allow.includes(user.email.toLowerCase());
}
