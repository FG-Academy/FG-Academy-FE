"use client";

import { signOut } from "@/auth";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRefreshTokenGuard(session: Session | null) {
  const router = useRouter();
  useEffect(() => {
    if (session && session.user?.error === "RefreshAccessTokenError") {
      router.refresh();
      router.push("/");
      signOut({ redirect: false });
    }
  }, [session, router]);
}
