import { NextResponse, type NextRequest } from "next/server";

import { safeNext } from "@/lib/supabase/config";
import { getSupabaseServer } from "@/lib/supabase/server";

/**
 * Landing point for Google sign-in, email confirmation and password-reset
 * links: swaps the one-time code for a session cookie, then returns to `next`.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const next = safeNext(searchParams.get("next"));
  const code = searchParams.get("code");
  const supabase = await getSupabaseServer();

  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, origin));
  }
  return NextResponse.redirect(new URL("/?auth=error", origin));
}
