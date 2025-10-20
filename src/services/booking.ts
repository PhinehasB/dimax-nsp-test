import { Booking } from "@/Types/Booking";
import { toast } from "sonner";

export async function createBooking(params: Booking) {
  try {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData?.message || `Booking failed (status ${res.status})`;
      toast.error(message);
      return null;
    }

    const data = await res.json();
    toast.success("Booking successful 🎉");
    return data; // e.g. user info, token, etc.
  } catch (error) {
    console.error(error);
    toast.error("Error Booking. Please try again.");
    return null;
  }
}
