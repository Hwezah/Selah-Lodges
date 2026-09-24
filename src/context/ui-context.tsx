"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type ToastTone = "ok" | "warn" | "hint";
export type Toast = { id: string; tone: ToastTone; title: string; body: string };
export type Notification = { id: string; title: string; body: string; at: number; unread: boolean };

/** Only one floating panel is open at a time, like the prototype. */
export type Panel = "cart" | "notif" | "drawer" | "cal-hero" | "cal-detail" | null;

type UIContextValue = {
  toasts: Toast[];
  toast: (tone: ToastTone, title: string, body: string) => void;
  dismissToast: (id: string) => void;
  notifications: Notification[];
  unreadCount: number;
  notify: (title: string, body: string) => void;
  markAllRead: () => void;
  panel: Panel;
  openPanel: (p: Panel) => void;
  /** Open a panel once the next navigation completes (e.g. calendar on the home page). */
  openPanelAfterNav: (p: Panel) => void;
  togglePanel: (p: Exclude<Panel, null>) => void;
  closePanels: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

const uid = () => Math.random().toString(36).slice(2);

export function UIProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const pathname = usePathname();
  const [panelState, setPanelState] = useState<{ panel: Panel; path: string; pending: Panel }>({
    panel: null,
    path: pathname,
    pending: null,
  });
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  // Close panels on navigation (or open the one queued for after it).
  if (panelState.path !== pathname) {
    setPanelState({ panel: panelState.pending, path: pathname, pending: null });
  }
  const panel = panelState.panel;
  const setPanel = useCallback((p: Panel) => setPanelState((s) => ({ ...s, panel: p })), []);
  const openPanelAfterNav = useCallback((p: Panel) => setPanelState((s) => ({ ...s, pending: p })), []);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);

  const toast = useCallback(
    (tone: ToastTone, title: string, body: string) => {
      const id = uid();
      setToasts((t) => [...t, { id, tone, title, body }]);
      timers.current.set(id, setTimeout(() => dismissToast(id), 5200));
    },
    [dismissToast],
  );

  const notify = useCallback((title: string, body: string) => {
    setNotifications((n) => [{ id: uid(), title, body, at: Date.now(), unread: true }, ...n].slice(0, 20));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((n) => n.map((x) => ({ ...x, unread: false })));
  }, []);

  const togglePanel = useCallback(
    (p: Exclude<Panel, null>) => setPanelState((s) => ({ ...s, panel: s.panel === p ? null : p })),
    [],
  );
  const closePanels = useCallback(() => setPanel(null), [setPanel]);

  // Close panels on any pointerdown outside a [data-keep-open] region.
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("[data-keep-open]")) return;
      setPanel(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [setPanel]);

  useEffect(() => {
    const map = timers.current;
    return () => map.forEach((t) => clearTimeout(t));
  }, []);

  const value = useMemo(
    () => ({
      toasts,
      toast,
      dismissToast,
      notifications,
      unreadCount: notifications.filter((n) => n.unread).length,
      notify,
      markAllRead,
      panel,
      openPanel: setPanel,
      openPanelAfterNav,
      togglePanel,
      closePanels,
    }),
    [toasts, toast, dismissToast, notifications, notify, markAllRead, panel, setPanel, openPanelAfterNav, togglePanel, closePanels],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}
