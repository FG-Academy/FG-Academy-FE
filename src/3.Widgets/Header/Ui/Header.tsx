"use client";

import { ReactNode, useCallback } from "react";
import { IoMenu } from "react-icons/io5";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Session } from "next-auth";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/6.shared/ui";
import { ADMIN_LEVELS } from "@/6.shared/config";
import { Logo } from "@/6.shared/ui";
import { useRefreshTokenGuard } from "@/6.shared/lib";

type Variant = "mobile" | "desktop";

function NavItem({
  href,
  children,
  variant,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant: Variant;
  onClick?: () => void;
}) {
  const base = variant === "mobile" ? "w-full text-left" : "mr-5";
  return (
    <Link
      className={`${base} hover:text-blue-900`}
      href={href}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

function BaseLinks({ variant }: { variant: Variant }) {
  return (
    <>
      <NavItem href="/introduce" variant={variant}>
        아카데미 소개
      </NavItem>
      <NavItem href="/course" variant={variant}>
        강의 목록
      </NavItem>
      <NavItem href={`/notice?page=1`} variant={variant}>
        공지사항
      </NavItem>
    </>
  );
}

function AdminOnlyLink({
  session,
  variant,
}: {
  session: Session | null;
  variant: Variant;
}) {
  const isPrivileged = (session: Session | null) =>
    Boolean(session && ADMIN_LEVELS.includes(session.user?.level));

  if (!isPrivileged(session)) return null;
  return (
    <NavItem href="/admin/videos" variant={variant}>
      관리자 페이지
    </NavItem>
  );
}

function AuthedLinks({
  variant,
  onLogout,
}: {
  variant: Variant;
  onLogout: () => void;
}) {
  return (
    <>
      <NavItem href="/myDashboard" variant={variant}>
        내 강의실
      </NavItem>
      <NavItem href={`/qna`} variant={variant}>
        질문게시판
      </NavItem>
      <NavItem href="/" variant={variant} onClick={onLogout}>
        로그아웃
      </NavItem>
      <NavItem href="/userInfo" variant={variant}>
        회원정보
      </NavItem>
    </>
  );
}

function GuestLinks({ variant }: { variant: Variant }) {
  return (
    <>
      <NavItem href="/login" variant={variant}>
        로그인
      </NavItem>
      <NavItem href="/signup" variant={variant}>
        회원가입
      </NavItem>
    </>
  );
}

function MobileMenu({ session }: { session: Session | null }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    router.refresh();
    router.push("/");
    signOut({ redirect: false });
  };

  return (
    <div className="md:hidden">
      <Collapsible key={pathname}>
        <CollapsibleTrigger asChild>
          <button>
            <IoMenu size={24} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent
          id="mobile-menu"
          className="absolute w-full top-full left-0 right-0 bg-[#eeeeee]"
        >
          <div className="flex flex-col items-start p-5 space-y-4">
            <BaseLinks variant="mobile" />
            <AdminOnlyLink session={session} variant="mobile" />
            {session ? (
              <AuthedLinks variant="mobile" onLogout={handleLogout} />
            ) : (
              <GuestLinks variant="mobile" />
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

function DesktopNav({ session }: { session: Session | null }) {
  const router = useRouter();

  const handleLogout = useCallback(() => {
    router.refresh();
    router.push("/");
    signOut({ redirect: false });
  }, [router]);

  return (
    <nav className="flex-wrap items-center justify-center hidden text-base md:flex md:ml-auto">
      <BaseLinks variant="desktop" />
      <AdminOnlyLink session={session} variant="desktop" />
      {session ? (
        <AuthedLinks variant="desktop" onLogout={handleLogout} />
      ) : (
        <GuestLinks variant="desktop" />
      )}
    </nav>
  );
}

export const Header = () => {
  const { data: session, status } = useSession();
  useRefreshTokenGuard(session);

  return (
    <header className="sticky inset-x-0 top-0 left-0 z-50 text-gray-700 bg-white border-b border-gray-200 font-Pretendard">
      <div className="relative flex flex-row flex-wrap items-center justify-between p-5 mx-auto md:flex-row">
        <Logo />
        {status !== "loading" && (
          <>
            <MobileMenu session={session} />
            <DesktopNav session={session} />
          </>
        )}
      </div>
    </header>
  );
};
