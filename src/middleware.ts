import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

// ============================================
// 라우트 설정 - 유지보수를 위해 설정을 분리
// ============================================

/** 인증이 필요한 경로 (로그인 안 하면 /login으로 리다이렉트) */
const PROTECTED_ROUTES = [
  "/qna",
  "/me",
];

/** 관리자 권한 설정 */
const ADMIN_CONFIG = {
  basePath: "/admin",
  /** 관리자 페이지 접근 가능한 역할 */
  allowedRoles: ["admin", "tutor", "manager"] as const,
  /** 역할별 허용 경로 (지정된 경로만 접근 가능) */
  rolePermissions: {
    tutor: {
      allowed: ["/admin/quizzes/descriptive"],
      defaultRedirect: "/admin/quizzes/descriptive",
    },
    manager: {
      allowed: ["/admin/videos", "/admin/quizzes/register"],
      defaultRedirect: "/admin/videos",
    },
    // admin은 모든 경로 접근 가능
  } as Record<string, { allowed: string[]; defaultRedirect: string }>,
};

// ============================================
// 헬퍼 함수
// ============================================

function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_HOST || "";
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith(ADMIN_CONFIG.basePath);
}

function isCourseSubRoute(pathname: string): { courseId: number; hasSubpath: boolean } | null {
  const match = pathname.match(/^\/course\/([^/]+)(\/.*)?$/);
  if (!match) return null;
  
  const courseId = parseInt(match[1]);
  if (!Number.isFinite(courseId)) return null;
  
  return {
    courseId,
    hasSubpath: !!match[2],
  };
}

// ============================================
// 미들웨어 핸들러
// ============================================

/** 인증되지 않은 사용자 처리 */
function handleUnauthenticated(request: NextRequest): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  
  // 보호된 경로 또는 관리자 경로 접근 시 로그인 페이지로 리다이렉트
  if (isProtectedRoute(pathname) || isAdminRoute(pathname)) {
    return NextResponse.redirect(`${getBaseUrl()}/login`);
  }
  
  // 강의 하위 경로 접근 시 로그인 페이지로 리다이렉트
  const courseInfo = isCourseSubRoute(pathname);
  if (courseInfo?.hasSubpath) {
    return NextResponse.redirect(`${getBaseUrl()}/login`);
  }
  
  return null;
}

/** 관리자 권한 체크 */
function handleAdminRoute(
  request: NextRequest,
  userLevel: string
): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  
  if (!isAdminRoute(pathname)) return null;
  
  // 관리자 역할이 아니면 메인으로 리다이렉트
  if (!ADMIN_CONFIG.allowedRoles.includes(userLevel as any)) {
    return NextResponse.redirect(`${getBaseUrl()}/`);
  }
  
  // admin은 모든 경로 접근 가능
  if (userLevel === "admin") return null;
  
  // 역할별 권한 체크
  const roleConfig = ADMIN_CONFIG.rolePermissions[userLevel];
  if (roleConfig) {
    const isAllowed = roleConfig.allowed.some(
      (allowed) => pathname === allowed || pathname.startsWith(`${allowed}/`)
    );
    
    if (!isAllowed) {
      return NextResponse.redirect(`${getBaseUrl()}${roleConfig.defaultRedirect}`);
    }
  }
  
  return null;
}

/** 강의 수강 권한 체크 */
function handleCourseRoute(
  request: NextRequest,
  enrollmentIds: number[]
): NextResponse | null {
  const pathname = request.nextUrl.pathname;
  const courseInfo = isCourseSubRoute(pathname);
  
  if (!courseInfo) return null;
  
  // 강의 상세 페이지는 누구나 접근 가능, 하위 경로는 수강생만
  if (courseInfo.hasSubpath && !enrollmentIds.includes(courseInfo.courseId)) {
    return NextResponse.redirect(`${getBaseUrl()}/`);
  }
  
  return null;
}

// ============================================
// 메인 미들웨어
// ============================================

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  // 1. 인증되지 않은 사용자 처리
  if (!session) {
    const response = handleUnauthenticated(request);
    if (response) return response;
    return NextResponse.next();
  }
  
  // 2. 관리자 권한 체크
  const adminResponse = handleAdminRoute(request, session.user.level);
  if (adminResponse) return adminResponse;
  
  // 3. 강의 수강 권한 체크
  const courseResponse = handleCourseRoute(
    request,
    session.user.enrollmentIds || []
  );
  if (courseResponse) return courseResponse;
  
  return NextResponse.next();
}

// ============================================
// 미들웨어 매칭 경로
// ============================================

export const config = {
  matcher: [
    // 보호된 경로 (exact + subpaths)
    "/qna",
    "/qna/:path*",
    "/me",
    "/me/:path*",
    // 강의 관련 경로
    "/course/:path+",
    // 관리자 경로
    "/admin/:path*",
  ],
};
