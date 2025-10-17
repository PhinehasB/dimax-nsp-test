import z from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "Name should be 3 or more letters"),
  email: z.email(),
  password: z.string(),
});
