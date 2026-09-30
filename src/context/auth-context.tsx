"use client";

import type { User } from "@supabase/supabase-js";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { AuthDialog, type AuthMode } from "@/components/auth/auth-dialog";
import { useUI } from "@/context/ui-context";
import { getSupabaseBrowser } from "@/lib/supabase/client";
import { safeNext, supabaseEnabled } from "@/lib/supabase/config";

type AuthContextValue = {
  enabled: boolean;
  user: User | null;
  ready: boolean;
  isAdmin: boolean;
  openAuth: (mode?: AuthMode) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function displayName(user: User): string {
  const meta = user.user_metadata as { full_name?: string; name?: string } | undefined;
  return meta?.full_name || meta?.name || user.email?.split("@")[0] || "Guest";
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useUI();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(!supabaseEnabled);
  const [dialog, setDialog] = useState<{ open: boolean; mode: AuthMode }>({ open: false, mode: "signin" });
  const [next, setNext] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "PASSWORD_RECOVERY") setDialog({ open: true, mode: "reset" });
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // Links can open the dialog: ?auth=signin|signup|reset|error (&next=/path).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("auth");
    if (!auth) return;
    /* eslint-disable react-hooks/set-state-in-effect -- reacting to a one-off URL flag */
    if (!supabaseEnabled) {
      toast("hint", "Sign-in is coming soon", "Your trips are saved on this device for now.");
    } else if (auth === "error") {
      toast("warn", "That link didn't work", "It may have expired. Please try again.");
    } else if (auth === "signin" || auth === "signup" || auth === "reset") {
      setNext(params.get("next"));
      setDialog({ open: true, mode: auth });
    }
    /* eslint-enable react-hooks/set-state-in-effect */
    params.delete("auth");
    params.delete("next");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? `?${qs}` : "") + window.location.hash);
  }, [pathname, toast]);

  const openAuth = useCallback((mode: AuthMode = "signin") => setDialog({ open: true, mode }), []);

  const onSignedIn = useCallback(() => {
    setDialog((d) => ({ ...d, open: false }));
    if (next) router.push(safeNext(next));
    setNext(null);
    router.refresh();
  }, [next, router]);

  const signOut = useCallback(async () => {
    const supabase = getSupabaseBrowser();
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    toast("hint", "Signed out", "See you soon.");
    if (pathname.startsWith("/admin")) router.push("/");
    router.refresh();
  }, [pathname, router, toast]);

  const isAdmin = (user?.app_metadata as { role?: string } | undefined)?.role === "admin";

  const value = useMemo(
    () => ({ enabled: supabaseEnabled, user, ready, isAdmin, openAuth, signOut }),
    [user, ready, isAdmin, openAuth, signOut],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {supabaseEnabled && (
        <AuthDialog
          open={dialog.open}
          mode={dialog.mode}
          next={next ?? pathname}
          onModeChange={(mode) => setDialog({ open: true, mode })}
          onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
          onSignedIn={onSignedIn}
        />
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
