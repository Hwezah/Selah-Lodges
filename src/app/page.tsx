import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Quiet retreats",
    description: "Hand-picked lodges designed for rest and reflection.",
  },
  {
    title: "Simple booking",
    description: "Choose your dates and guests in a few clicks.",
  },
  {
    title: "Your account",
    description: "Manage reservations securely from your dashboard.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-20">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Pause. Rest. Selah.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Discover peaceful lodges and book your next getaway with ease.
        </p>
        <div className="flex gap-3">
          <Button size="lg" asChild>
            <Link href="/dashboard">Start booking</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Learn more</Link>
          </Button>
        </div>
      </section>

      <section id="features" className="grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
