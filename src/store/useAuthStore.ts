// Importing create function from the Zustand library
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Defining an interface for the store's state
interface AuthStoreInterface {
  authenticated: boolean; // a boolean value indicating whether the user is authenticated or not
  setAuthentication: (val: boolean) => void; // a function to set the authentication status
  user: any; // an object that stores user information
  setUser: (user: any) => void; // a function to set user information
  accessToken: string | null;
  setAccessToken: (finished: string) => void;
}

// create our store
export const useAuthStore = create(
  persist<AuthStoreInterface>(
    (set) => ({
      authenticated: false, // initial value of authenticated property
      setAuthentication: (val) => set((state) => ({ authenticated: val })), // function to set the authentication status
      user: {}, // initial value of user property
      setUser: (user) => set({ user }), // function to set user information
      accessToken: null, // initial value of accessToken property
      setAccessToken: (token) => set((state) => ({ accessToken: token })), // function to set the access token
    }),
    { name: "AuthStore" }
  )
);
