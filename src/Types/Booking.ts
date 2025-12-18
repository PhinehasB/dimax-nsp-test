export type Booking = {
  event_id: string;
  ticket_type_id: string;
  quantity: number;
  user_name: string;
  user_email: string;
  booking_date: string; // ISO 8601 date-time string, e.g. "2025-10-15T23:00:00Z"
};
