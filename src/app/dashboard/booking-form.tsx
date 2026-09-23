"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/context/booking-context";

export function BookingForm() {
  const { booking, updateBooking, resetBooking } = useBooking();

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>New booking</CardTitle>
        <CardDescription>
          Draft state lives in the BookingContext (Context API).
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="check-in">Check-in</Label>
          <Input
            id="check-in"
            type="date"
            value={booking.checkIn ?? ""}
            onChange={(e) => updateBooking({ checkIn: e.target.value || null })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="check-out">Check-out</Label>
          <Input
            id="check-out"
            type="date"
            value={booking.checkOut ?? ""}
            onChange={(e) =>
              updateBooking({ checkOut: e.target.value || null })
            }
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="guests">Guests</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            value={booking.guests}
            onChange={(e) =>
              updateBooking({ guests: Math.max(1, Number(e.target.value)) })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" onClick={resetBooking}>
          Reset
        </Button>
        <Button disabled={!booking.checkIn || !booking.checkOut}>
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
}
