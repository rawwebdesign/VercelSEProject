import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  // Extract city. Default to Unknown City if not found.
  const city = (request.geo && request.geo.city) || "Unknown City";

  // Clone the request headers and set a new header
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-city", city);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
