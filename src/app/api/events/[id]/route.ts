import { Events } from "@/app/Store/EventStore";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(id);

  // Check if Event store has an event with that id
  const event = Events.find((event) => event.id === id);

  // else send a response with status 404 and a message saying "Event not found"
  if (!event)
    Response.json(
      {
        success: false,
        message: "Event not found",
      },
      { status: 404 }
    );

  // On success send a response with a 200 status and the event
  return Response.json(
    {
      success: true,
      message: "Event found",
      data: event,
    },
    { status: 200 }
  );
}
