import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//TODO clean this up

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const abTestVariant = request.cookies.get("ab-test-variant");

  if (!abTestVariant) {
    const variant = Math.random() < 0.5 ? "A" : "B"; // 50/50 split
    response.cookies.set("ab-test-variant", variant);
    if (variant === "A") {
      request.headers.set("x-hn-results-limit", "10");
    }
  } else if (abTestVariant.value === "A") {
    request.headers.set("x-hn-results-limit", "10");
  }

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
}
