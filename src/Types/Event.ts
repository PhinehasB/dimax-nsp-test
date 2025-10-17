type TicketType = {
  type_id: string;
  name: string;
  price: number;
  description: string;
};

export type Event = {
  id: string;
  title: string;
  date: string; // ISO date string (e.g. "2026-03-15T09:00:00Z")
  location: string;
  description: string;
  image_url: string;
  available_tickets: number;
  ticket_types: TicketType[];
};
