import { NextRequest, NextResponse } from "next/server";
import { auth } from "@auth";

// ============================================
// 타입 정의
// ============================================

type AdminRole = "admin" | "tutor" | "manager";

interface RolePermission {
  allowed: string[];
  defaultRedirect: string;
}

interface CourseRouteInfo {
  courseId: number;
  hasLecturePath: boolean;
}

// ============================================
// 라우트 설정
// ============================================

/** 인증이 필요한 경로 */
const PROTECTED_ROUTES = ["/qna", "/me"] as const;

/** 관리자 권한 설정 */
const ADMIN_CONFIG = {
  basePath: "/admin",
  allowedRoles: ["admin", "tutor", "manager"] as const,
  rolePermissions: {
    tutor: {
      allowed: ["/admin/quizzes/descriptive"],
      defaultRedirect: "/admin/quizzes/descriptive",
    },
    manager: {
      allowed: ["/admin/videos", "/admin/quizzes/register"],
      defaultRedirect: "/admin/videos",
    },
    // admin은 모든 경로 접근 가능하므로 별도 설정 없음
  } satisfies Partial<Record<AdminRole, RolePermission>>,
} as const;

// ============================================
// 헬퍼 함수
// ============================================

/** 절대 URL 생성 */
function createAbsoluteUrl(request: NextRequest, path: string): URL {
  return new URL(path, request.url);
}

/** 관리자 역할 여부 확인 */
function isAdminRole(level: string): level is AdminRole {
  return (ADMIN_CONFIG.allowedRoles as readonly string[]).includes(level);
}

/** 보호된 경로 여부 확인 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/** 관리자 경로 여부 확인 */
function isAdminRoute(pathname: string): boolean {
  return pathname.startsWith(ADMIN_CONFIG.basePath);
}

/** 강의 경로 파싱 - /course/:courseId 또는 /course/:courseId/* 형태 */
function parseCourseRoute(pathname: string): CourseRouteInfo | null {
  const match = pathname.match(/^\/course\/(\d+)(\/.*)?$/);
  if (!match) return null;

  return {
    courseId: parseInt(match[1], 10),
    hasLecturePath: Boolean(match[2]),
  };
}

/** 경로 접근 권한 확인 */
function hasPathAccess(pathname: string, allowedPaths: string[]): boolean {
  return allowedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );
}

// ============================================
// 미들웨어 핸들러
// ============================================

/** 비인증 사용자 리다이렉트 처리 */
function handleUnauthenticated(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  // 보호된 경로, 관리자 경로, 강의 상세 경로 접근 시 로그인으로 리다이렉트
  const requiresAuth =
    isProtectedRoute(pathname) ||
    isAdminRoute(pathname) ||
    parseCourseRoute(pathname) !== null;

  if (requiresAuth) {
    return NextResponse.redirect(createAbsoluteUrl(request, "/login"));
  }

  return null;
}

/** 관리자 권한 검증 */
function handleAdminRoute(
  request: NextRequest,
  userLevel: string
): NextResponse | null {
  const { pathname } = request.nextUrl;

  if (!isAdminRoute(pathname)) return null;

  // 관리자 역할이 아니면 메인으로 리다이렉트
  if (!isAdminRole(userLevel)) {
    return NextResponse.redirect(createAbsoluteUrl(request, "/"));
  }

  // admin은 모든 경로 접근 가능
  if (userLevel === "admin") return null;

  // 역할별 권한 검증
  const roleConfig =
    ADMIN_CONFIG.rolePermissions[userLevel as Exclude<AdminRole, "admin">];

  if (roleConfig && !hasPathAccess(pathname, roleConfig.allowed)) {
    return NextResponse.redirect(
      createAbsoluteUrl(request, roleConfig.defaultRedirect)
    );
  }

  return null;
}

/** 강의 수강 권한 검증 */
function handleCourseAccess(
  request: NextRequest,
  enrollmentIds: number[]
): NextResponse | null {
  const { pathname } = request.nextUrl;
  const courseInfo = parseCourseRoute(pathname);

  if (!courseInfo) return null;

  // 강의 하위 경로(강의 영상 등)는 수강생만 접근 가능
  const isEnrolled = enrollmentIds.includes(courseInfo.courseId);

  if (courseInfo.hasLecturePath && !isEnrolled) {
    return NextResponse.redirect(createAbsoluteUrl(request, "/"));
  }

  return null;
}

// ============================================
// 메인 미들웨어
// ============================================

export async function middleware(request: NextRequest) {
  const session = await auth();

  // 1. 비인증 사용자 처리
  if (!session) {
    return handleUnauthenticated(request) ?? NextResponse.next();
  }

  // 2. 관리자 권한 검증
  const adminResponse = handleAdminRoute(request, session.user.level);
  if (adminResponse) return adminResponse;

  // 3. 강의 수강 권한 검증
  const courseResponse = handleCourseAccess(
    request,
    session.user.enrollmentIds ?? []
  );
  if (courseResponse) return courseResponse;

  return NextResponse.next();
}

// ============================================
// 미들웨어 매칭 경로
// ============================================

export const config = {
  matcher: [
    // 보호된 경로
    "/qna/:path*",
    "/me/:path*",
    // 강의 상세 및 하위 경로
    "/course/:path+",
    // 관리자 경로
    "/admin/:path*",
  ],
};
