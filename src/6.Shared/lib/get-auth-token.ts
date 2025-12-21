"use server";
import { auth } from "../../../app/auth";

export const getAuthToken = async (): Promise<string | null> => {
  const session = await auth();
  return session?.user?.accessToken || null;
};
