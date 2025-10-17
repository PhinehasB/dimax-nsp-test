export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(id);

  // Check if Event store has an event with that id

  // On success send a response with a 200 status and the event

  // else send a response with status 404 and a message saying "Event not found"
}
