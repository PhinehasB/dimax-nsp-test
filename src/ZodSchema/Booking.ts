import z from "zod";

export const BookingSchema = z.object({
  event_id: z.string().min(1),
  ticket_type_id: z.string().min(1),
  quantity: z.number().int().positive(),
  user_name: z.string().min(1),
  user_email: z.string().email(),
  // keep as string but validate ISO date-time; optionally transform to Date
  booking_date: z
    .string()
    .refine((s) => !isNaN(Date.parse(s)), { message: "Invalid ISO date-time" }),
});
