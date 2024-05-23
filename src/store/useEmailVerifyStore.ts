// Importing create function from the Zustand library
import { create } from "zustand";

interface EmailVerifyInterface {
  isLoading: boolean;
  setLoading: (item: boolean) => void;
  isVerificationSent: boolean;
  setVerificationSent: (item: boolean) => void;
  verificationCode: string;
  setVerificationCode: (item: string) => void;
  email: string;
  setEmail: (item: string) => void;
}

const useEmailVerifyStore = create<EmailVerifyInterface>((set) => ({
  isLoading: false,
  setLoading: (item) => set({ isLoading: item }),
  isVerificationSent: false,
  setVerificationSent: (item) => set({ isVerificationSent: item }),
  verificationCode: "",
  setVerificationCode: (item) => set({ verificationCode: item }),
  email: "",
  setEmail: (item) => set({ email: item }),
}));

export default useEmailVerifyStore;
