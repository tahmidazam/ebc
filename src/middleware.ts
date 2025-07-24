import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const code = request.cookies.get("code")?.value;
  const { pathname } = request.nextUrl;

  const isAuthenticated = code !== undefined && code !== "";

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
