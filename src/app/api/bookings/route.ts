import { BookingSchema } from "@/ZodSchema/Booking";

export async function POST(req: Request) {
  const bookingData = await req.json();
  console.log(bookingData);

  // validate payload in request body
  const validatedBooking = BookingSchema.safeParse(bookingData);

  // else send the unvalidated feilds
  if (!validatedBooking.success)
    Response.json(
      {
        success: false,
        message: "Type error",
        error: validatedBooking.error,
      },
      { status: 400 }
    );

  // on success send response with status 201 and the payload
  return Response.json(
    {
      success: true,
      message: "Booking Created Successfully",
      data: validatedBooking.data,
    },
    { status: 201 }
  );
}
