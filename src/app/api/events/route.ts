import { Events } from "@/app/Store/EventStore";

export async function GET() {
  const events = Events;
  //return all events in the  Event store dummy data
  Response.json(
    {
      success: true,
      data: events,
    },
    { status: 200 }
  );
}
