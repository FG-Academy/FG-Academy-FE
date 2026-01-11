"use client";

import { useEffect } from "react";

import { Session } from "next-auth";
import { SessionProvider, signOut, useSession } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session?: Session | null;
};

function AuthErrorHandler({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/login" });
    }
  }, [session?.user?.error]);

  return <>{children}</>;
}

export const AuthProvider = ({ children, session }: Props) => {
  return (
    <SessionProvider session={session}>
      <AuthErrorHandler>{children}</AuthErrorHandler>
    </SessionProvider>
  );
};
