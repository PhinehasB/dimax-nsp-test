"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Event } from "@/Types/Event";
import { Booking } from "@/Types/Booking";
import Image from "next/image";
import { getAnEvent } from "@/services/event";
import { LoaderCircleIcon } from "lucide-react";
import { useUser } from "@/lib/UserContext";
import { createBooking } from "@/services/booking";

export default function EventDetailPage() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const defaultFormData = {
    ticket_type_id: "",
    quantity: 1,
    user_name: user.isLoggedIn ? user.name : "",
    user_email: user.isLoggedIn ? user.email : "",
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isLoading && !user.isLoggedIn) {
      router.push("/");
    }
    if (!isLoading && user.isLoggedIn) {
      setFormData({
        ticket_type_id: "",
        quantity: 1,
        user_name: user.isLoggedIn ? user.name : "",
        user_email: user.isLoggedIn ? user.email : "",
      });
    }
  }, [isLoading, user.isLoggedIn, router, user.name, user.email]);

  const params = useParams();
  const eventId = params.id as string;
  // console.log(eventId);
  const [event, setEvent] = useState<Event | null>(null);
  const [found, setFound] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading && user.isLoggedIn) {
      async function fetchEvents() {
        const anEvent = await getAnEvent(eventId);
        setEvent(anEvent?.data);
        setFound(anEvent?.success);
      }

      fetchEvents();
    }
  }, [eventId, isLoading, user.isLoggedIn]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-2 text-teal-600">
          <LoaderCircleIcon className="animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return null;
  }

  if (!event) {
    return (
      <div className="my-6 flex items-center justify-center gap-1 text-teal-600">
        <LoaderCircleIcon className="animate-spin " /> <span>Loading ...</span>
      </div>
    );
  }

  if (!found) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold">Event not found</h1>
        </div>
      </main>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, "MMMM dd, yyyy");
  const formattedTime = format(eventDate, "h:mm a");

  const selectedTicketType = event.ticket_types.find(
    (t) => t.type_id === formData.ticket_type_id
  );
  const totalPrice = selectedTicketType
    ? selectedTicketType.price * formData.quantity
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.ticket_type_id ||
      !formData.user_name ||
      !formData.user_email
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const booking: Booking = {
      event_id: event.id,
      ticket_type_id: formData.ticket_type_id,
      quantity: formData.quantity,
      user_name: formData.user_name,
      user_email: formData.user_email,
      booking_date: new Date().toISOString(),
    };

    const res = await createBooking(booking);

    // console.log("Booking submitted:", booking);
    setSubmitted(res.success);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData(defaultFormData);
      router.push("/events");
    }, 3000);
  };

  if (!isLoading && user.isLoggedIn) {
    return (
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Event Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                <Image
                  height={720}
                  width={720}
                  src={event.image_url || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h1 className="text-4xl text-teal-600 font-bold mb-2">
                  {event.title}
                </h1>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    📅{" "}
                    <span>
                      {formattedDate} at {formattedTime}
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    📍 <span>{event.location}</span>
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ticket Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.ticket_types.map((ticket) => (
                      <div
                        key={ticket.type_id}
                        className="flex items-start justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold">{ticket.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {ticket.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-teal-600">
                            ${ticket.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Form */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Book Tickets</CardTitle>
                  <CardDescription>
                    {event.available_tickets} tickets available
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">✓</div>
                      <h3 className="font-semibold mb-1">Booking Confirmed!</h3>
                      <p className="text-sm text-muted-foreground">
                        Check your email for confirmation details.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Ticket Type Selection */}
                      <div>
                        <Label htmlFor="ticket-type" className="mb-2 block">
                          Ticket Type *
                        </Label>
                        <select
                          id="ticket-type"
                          value={formData.ticket_type_id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ticket_type_id: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                        >
                          <option value="">Select a ticket type</option>
                          {event.ticket_types.map((ticket) => (
                            <option key={ticket.type_id} value={ticket.type_id}>
                              {ticket.name} - ${ticket.price}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Quantity */}
                      <div>
                        <Label htmlFor="quantity" className="mb-2 block">
                          Quantity *
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          min="1"
                          max={event.available_tickets}
                          value={formData.quantity}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              quantity: Math.max(
                                1,
                                Number.parseInt(e.target.value) || 1
                              ),
                            })
                          }
                        />
                      </div>

                      {/* Name */}
                      <div>
                        <Label htmlFor="name" className="mb-2 block">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.user_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              user_name: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email" className="mb-2 block">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.user_email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              user_email: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Price Summary */}
                      {selectedTicketType && (
                        <div className="bg-muted p-4 rounded-lg space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>
                              {selectedTicketType.name} x {formData.quantity}
                            </span>
                            <span>
                              ${selectedTicketType.price * formData.quantity}
                            </span>
                          </div>
                          <div className="border-t border-border pt-2 flex justify-between font-semibold">
                            <span>Total</span>
                            <span className="text-primary">${totalPrice}</span>
                          </div>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-500 cursor-pointer"
                        size="lg"
                      >
                        Complete Booking
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
