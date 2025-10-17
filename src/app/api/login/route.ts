import { Users } from "@/app/Store/UserStore";
import type { User } from "@/Types/User";
import { UserSchema } from "@/ZodSchema/User";

export async function POST(req: Request) {
  // Get the paylooad from the request body
  type UserLoginType = Omit<User, "name">;
  const loginData: UserLoginType = await req.json();
  console.log(loginData);

  // Type check the body so i can validate input feilds
  const validatedUser = UserSchema.omit({ name: true }).safeParse(loginData);

  if (!validatedUser.success)
    Response.json(
      {
        message: "Type error",
        error: validatedUser.error,
      },
      { status: 400 }
    );

  // Check if the payload has or matches an element in the user Array in the User store dummy data
  const foundUser = Users.find(
    (user) =>
      user.email === validatedUser.data?.email &&
      user.password === validatedUser.data.password
  );

  // Else send a 404 status response with a message "wrong email or password"
  if (!foundUser)
    Response.json(
      {
        success: false,
        message: "Wrong email or password",
      },
      { status: 404 }
    );

  // On success, send a 200 stutus response and the user data to the response body
  return Response.json({
    success: true,
    message: "Login Successful",
    user: foundUser,
  });
}
