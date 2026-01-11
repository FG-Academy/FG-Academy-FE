import { SERVER_API_URL } from "@/6.shared/config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // 토큰 관련 action 시 호출되는 Callback
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session !== null) {
        if (session.name) {
          token.name = session.name;
        }
        if (session.level) {
          token.level = session.level;
        }
        if (session.enrollmentIds) {
          token.enrollmentIds = session.enrollmentIds;
        }
        if (session.department) {
          token.department = session.department;
        }
      }

      if (user) {
        // Initial Login에만 user가 존재
        console.log("initial login", user, Date.now());
        return {
          ...user,
          accessToken: user.accessToken,
          expiresAt: Math.floor(Date.now() / 1000 + user.expiresIn),
          refreshToken: user.refreshToken,
        };
      } else if (Date.now() < (token.expiresAt as number) * 1000) {
        // 첫 로그인 이후 토큰 access
        return token;
      } else {
        // 토큰 만료 - refresh 시도
        try {
          const response = await fetch(
            `${SERVER_API_URL}/api/v1/auth/refresh-token`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Cookie: `refreshToken=${token.refreshToken}`,
              },
              credentials: "include",
            }
          );
          const newTokens = await response.json();

          if (!response.ok) throw newTokens;

          return {
            ...token,
            accessToken: newTokens.accessToken,
            expiresAt: Math.floor(Date.now() / 1000 + newTokens.expiresIn),
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    // Session 관련 action 시 호출되는 callback
    session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.sub ?? "",
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        expiresAt: token.expiresAt,
        level: token.level,
        department: token.department,
        enrollmentIds: token.enrollmentIds,
        error: token.error,
      };
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // signIn 호출 시 동작
        const authResponse = await fetch(
          `${SERVER_API_URL}/api/v1/auth/sign-in`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nameBirthId: credentials.nameBirthId,
              password: credentials.password,
            }),
            credentials: "include",
          }
        );

        if (!authResponse.ok) {
          console.log("Login failed:", authResponse.status);
          return null;
        }

        const user = await authResponse.json();
        return user;
      },
    }),
  ],
});
