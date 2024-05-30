import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_HOST}/login`);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (
      session.user.level !== "admin" &&
      session.user.level !== "tutor" &&
      session.user.level !== "manager"
    ) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_HOST}/`);
    } else if (
      session.user.level === "tutor" &&
      request.nextUrl.pathname !== "/admin/quizzes/descriptive"
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_HOST}/admin/quizzes/descriptive`
      );
    } else if (
      session.user.level === "manager" &&
      !(
        request.nextUrl.pathname === "/admin/videos" ||
        request.nextUrl.pathname === "/admin/quizzes/register"
      )
    ) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_HOST}/admin/videos`
      );
    }
  }

  const courseMatch = request.nextUrl.pathname.match(
    /^\/course\/([^/]+)(\/.*)?$/
  );
  if (courseMatch) {
    const courseId = parseInt(courseMatch[1]);
    const subpath = courseMatch[2];
    if (subpath && !session.user.enrollmentIds.includes(courseId)) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_HOST}/`);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/course/:path+", "/admin/:path*"],
};
