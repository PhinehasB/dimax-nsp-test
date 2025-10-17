export async function POST(req: Request) {
  // Type check the body so i can validate input feilds

  // Get the paylooad from the request body
  console.log(req.body);

  // Check if the payload has or matches an element in the user Array in the User store dummy data

  // On success, send a 200 stutus response and the user data to the response body

  // Else send a 404 status response with a message "wrong email or password"
}
