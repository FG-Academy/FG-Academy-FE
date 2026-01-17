"use server";
import { auth } from "@auth";

export const getAuthToken = async (): Promise<string | null> => {
  const session = await auth();
  return session?.user?.accessToken || null;
};
