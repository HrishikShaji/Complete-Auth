import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_JWT_SECRET,
  });

  if (token) {
    switch (pathname) {
      case "/auth":
        return NextResponse.redirect(new URL("/", request.url));
      default:
        break;
    }
  }

  if (!token) {
    switch (pathname) {
      case "/":
        return NextResponse.redirect(new URL("/auth", request.url));
      default:
        break;
    }
  }

  return NextResponse.next();
}
