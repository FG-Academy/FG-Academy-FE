import NextAuth from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: number;
//       name: string;
//       email: string;
//       accessToken: string;
//     };
//   }
// }

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string;
      accessToken: any & DefaultSession["user"];
    };
    accessToken: string;
  }

  interface User {
    accessToken: any & DefaultSession["user"];
    refreshToken: any & DefaultSession["user"];
    expiresIn: any & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    accessToken?: string;
    // expiresAt?: string;
  }
}
