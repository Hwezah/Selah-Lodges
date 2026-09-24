import type { Metadata } from "next";

import { AdminConsole } from "@/components/admin/admin-console";
import { isAdmin } from "@/lib/server/admin";

export const metadata: Metadata = { title: "Admin console", robots: { index: false } };

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <main className="mx-auto w-full max-w-[720px] px-[clamp(16px,4vw,24px)] pt-[clamp(40px,7vw,72px)] pb-[120px]">
        <h1 className="font-display text-[clamp(26px,4.8vw,46px)] tracking-[-.02em]">Admins only</h1>
        <p className="mt-3 text-base leading-[1.6] text-stone-600">
          Your account doesn&apos;t have access to the admin console. Ask the owner to give your Clerk user the{" "}
          <code className="rounded bg-stone-100 px-1">admin</code> role.
        </p>
      </main>
    );
  }
  return <AdminConsole />;
}
