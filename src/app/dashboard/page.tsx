import { currentUser } from "@clerk/nextjs/server";

import { BookingForm } from "./booking-form";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome{user?.firstName ? `, ${user.firstName}` : ""}
        </h1>
        <p className="text-muted-foreground">Plan your next stay.</p>
      </div>
      <BookingForm />
    </div>
  );
}
