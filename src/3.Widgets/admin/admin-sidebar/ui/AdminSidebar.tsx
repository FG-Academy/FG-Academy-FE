"use client";

import {
  Users,
  Video,
  MessageCircleQuestion,
  LayoutGrid,
  ChevronDown,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/6.shared/lib";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  children?: React.ReactNode;
  hasSubmenu?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
}

function NavItem({
  href,
  icon,
  label,
  isActive,
  children,
  hasSubmenu,
  isExpanded,
  onToggle,
}: NavItemProps) {
  if (hasSubmenu) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={cn(
            "w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
            isActive
              ? "bg-gray-100 text-gray-900"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          )}
        >
          <div className="flex items-center gap-3">
            {icon}
            <span>{label}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isExpanded && "rotate-180"
            )}
          />
        </button>
        {isExpanded && <div className="mt-1 ml-4 space-y-1">{children}</div>}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface SubNavItemProps {
  href: string;
  label: string;
  isActive: boolean;
}

function SubNavItem({ href, label, isActive }: SubNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors",
        isActive
          ? "bg-gray-100 text-gray-900 font-medium"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>{label}</span>
    </Link>
  );
}

export function AdminSidebar() {
  const { data: session } = useSession();
  const userLevel = session?.user.level;
  const pathname = usePathname();
  const [quizExpanded, setQuizExpanded] = useState(
    pathname.includes("quizzes")
  );

  const isActive = (path: string) => pathname.includes(path);

  return (
    <aside className="w-60 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex justify-center items-center px-6 border-b border-gray-200">
        <Link href="/" className="flex items-center">
          <Image
            alt="logo"
            src="/images/logo_black.png"
            width={140}
            height={40}
            style={{
              width: "auto",
              height: "32px",
            }}
            priority={true}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {userLevel === "tutor" ? (
          <NavItem
            href="/admin/quizzes"
            icon={<MessageCircleQuestion className="h-5 w-5" />}
            label="퀴즈 관리"
            isActive={isActive("quizzes")}
          />
        ) : (
          <>
            {userLevel === "admin" && (
              <NavItem
                href="/admin/users"
                icon={<Users className="h-5 w-5" />}
                label="유저 관리"
                isActive={isActive("users")}
              />
            )}
            <NavItem
              href="/admin/courses"
              icon={<Video className="h-5 w-5" />}
              label="강의 관리"
              isActive={isActive("courses")}
            />
            <NavItem
              href="/admin/category"
              icon={<LayoutGrid className="h-5 w-5" />}
              label="카테고리 관리"
              isActive={isActive("category")}
            />
            <NavItem
              href="/admin/quizzes"
              icon={<MessageCircleQuestion className="h-5 w-5" />}
              label="퀴즈 관리"
              isActive={isActive("quizzes")}
              hasSubmenu
              isExpanded={quizExpanded}
              onToggle={() => setQuizExpanded(!quizExpanded)}
            >
              {userLevel === "admin" && (
                <SubNavItem
                  href="/admin/quizzes/descriptive"
                  label="퀴즈 채점"
                  isActive={isActive("quizzes/descriptive")}
                />
              )}
              <SubNavItem
                href="/admin/quizzes/register"
                label="퀴즈 등록"
                isActive={isActive("quizzes/register")}
              />
            </NavItem>
          </>
        )}
      </nav>

      {/* User Info (optional footer) */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50">
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {session?.user?.name?.charAt(0) || "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {session?.user?.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userLevel === "admin"
                ? "관리자"
                : userLevel === "tutor"
                ? "튜터"
                : "매니저"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
