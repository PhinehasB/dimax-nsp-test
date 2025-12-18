import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import { Event } from "@/Types/Event";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const formattedDate = format(eventDate, "MMM dd, yyyy");
  const formattedTime = format(eventDate, "h:mm a");

  return (
    <Card className="overflow-hidden hover:shadow-lg pt-0 transition-shadow group">
      <div className="relative h-48 bg-muted overflow-hidden">
        <Image
          height={720}
          width={720}
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <span>
            📅 {formattedDate} at {formattedTime}
          </span>
          <span>📍 {event.location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {event.available_tickets} tickets available
          </span>
          <Link href={`/events/${event.id}`}>
            <Button
              className="group-hover:bg-teal-600 hover:bg-teal-500 cursor-pointer duration-200"
              size="sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
