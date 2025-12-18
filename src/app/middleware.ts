// middleware.ts (in your root directory)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Check if user is authenticated (adjust based on your auth mechanism)
  const token = request.cookies.get("your-auth-token");

  if (!token && request.nextUrl.pathname.startsWith("/events")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/events/:path*"],
};
