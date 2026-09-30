import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { supabaseEnabled, supabaseKey, supabaseUrl } from "@/lib/supabase/config";

let client: SupabaseClient | null = null;

/** Browser Supabase client (a singleton), or null when Supabase isn't configured. */
export function getSupabaseBrowser(): SupabaseClient | null {
  if (!supabaseEnabled) return null;
  client ??= createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
