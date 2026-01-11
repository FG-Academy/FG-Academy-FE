import { create } from "zustand";

interface SignupStoreState {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  isVerificationSent: boolean;
  setVerificationSent: (value: boolean) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  email: string;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useSignupStore = create<SignupStoreState>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
  isVerificationSent: false,
  setVerificationSent: (value) => set({ isVerificationSent: value }),
  verificationCode: "",
  setVerificationCode: (code) => set({ verificationCode: code }),
  email: "",
  setEmail: (email) => set({ email }),
  reset: () =>
    set({
      isLoading: false,
      isVerificationSent: false,
      verificationCode: "",
      email: "",
    }),
}));
