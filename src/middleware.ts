import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;
  const { pathname } = request.nextUrl;

  const isAuthenticated = role === "true";

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home"],
};
