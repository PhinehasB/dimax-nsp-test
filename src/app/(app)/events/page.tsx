"use client";
import { EventCard } from "@/components/EventCard";
import { getAllEvents } from "@/services/event";
import { Event } from "@/Types/Event";
import { LoaderCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[] | null>(null);
  useEffect(() => {
    async function fetchEvents() {
      const allEvents = await getAllEvents();
      setEvents(allEvents?.data);
    }

    fetchEvents();
  }, []);

  console.log(events);

  return (
    <div>
      <div className="relative flex items-center justify-center px-4 py-20 bg-[url('https://images.pexels.com/photos/636235/pexels-photo-636235.jpeg')] bg-cover bg-center h-[60dvh] w-[98dvw] rounded-md">
        <div className="absolute inset-0 bg-black/40 rounded-md" />

        <div className="relative text-center space-y-6 max-w-2xl mx-auto">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-500 via-teal-300 to-yellow-200 bg-clip-text bg-cover bg-center text-transparent animate-rotate-gradient">
            Event Booking Platform
          </h1>
          <p className="text-xl text-gray-100">
            Discover amazing events and book your tickets with ease
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-teal-600">
            Upcoming Events
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover and book tickets for amazing events
          </p>
        </div>

        {!events ? (
          <div className="my-6 flex items-center justify-center gap-1 text-teal-600">
            <LoaderCircleIcon className="animate-spin " />{" "}
            <span>Loading ...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
