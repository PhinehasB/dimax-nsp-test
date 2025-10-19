import { toast } from "sonner";

export async function getAllEvents() {
  try {
    const res = await fetch("/api/events", {
      method: "GET",
      cache: "no-store",
    });
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      toast.error("Error loading Events");
      // throw new Error(`${res.json()}`)
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAnEvent(id: string) {
  try {
    const res = await fetch(`/api/events/${id}`, {
      method: "GET",
      cache: "no-store",
    });
    console.log(res);
    if (res.ok) {
      return res.json();
    } else {
      toast.error("Error loading Event");
      // throw new Error(`${res.json()}`)
      return res.json();
    }
  } catch (error) {
    console.log(error);
  }
}
