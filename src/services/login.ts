import { User } from "@/Types/User";
import { toast } from "sonner";

export async function login(params: Omit<User, "name">) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData?.message || `Login failed (status ${res.status})`;
      toast.error(message);
      return null;
    }

    const data = await res.json();
    toast.success("Login successful 🎉");
    return data; // e.g. user info, token, etc.
  } catch (error) {
    console.error(error);
    toast.error("Error logging in. Please try again.");
    return null;
  }
}
