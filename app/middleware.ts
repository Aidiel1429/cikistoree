import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const response = NextResponse.next();

  response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
  return response;
}
