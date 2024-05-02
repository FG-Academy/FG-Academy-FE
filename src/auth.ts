import NextAuth, { DefaultSession, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

type NullableSession = Session | DefaultSession | null;

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
    async jwt({ token, user }) {
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
        // console.log(Date.now(), (token.expiresAt as number) * 1000);
        // 첫 로그인 이후 토큰 access
        return token;
      } else {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_DOCKER_HOST}/auth/refresh-token`,
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

          if (!response.ok) throw response.body;

          return {
            ...token,
            accessToken: newTokens.accessToken,
            expiresAt: Math.floor(Date.now() / 1000 + newTokens.expiresIn),
            // refreshToken: newTokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
    // Session 관련 action 시 호출되는 callback
    session({ session, token }) {
      session.user = token as any;
      // console.log(session);
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // signIn 호출 시 동작
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_DOCKER_HOST}/auth/sign-in`,
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
        // console.log(authResponse);

        if (!authResponse.ok) {
          console.log("return null");
          return null;
        }

        const user = await authResponse.json();
        return user;
      },
    }),
  ],
});
