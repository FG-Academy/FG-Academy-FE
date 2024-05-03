import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_HOST}/login`);
  }

  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    session.user.level !== "admin"
  ) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_HOST}/`);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/course/:path+", "/admin/:path*"],
};
