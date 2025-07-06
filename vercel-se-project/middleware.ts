import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const searchTermFromQuery = searchParams.get("search");

  if (searchTermFromQuery) {
    return NextResponse.redirect(
      new URL(`/topic/${searchTermFromQuery}`, request.url),
    );
  }
}
