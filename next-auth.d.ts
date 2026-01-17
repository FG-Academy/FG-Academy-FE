import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      expiresAt: number;
      level: string;
      department: string;
      enrollmentIds: number[];
      error?: "RefreshAccessTokenError";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    level: string;
    department: string;
    enrollmentIds: number[];
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
    expiresIn?: number;
    level: string;
    department: string;
    enrollmentIds: number[];
    error?: "RefreshAccessTokenError";
  }
}
