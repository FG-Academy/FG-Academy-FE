// Importing create function from the Zustand library
import { create } from "zustand";

interface ResetPasswordStoreInterface {
  uiState: string;
  setUiState: (item: string) => void;
  verificationCode: string;
  setVerificationCode: (item: string) => void;
  email: string;
  setEmail: (item: string) => void;
}

const useResetPasswordStore = create<ResetPasswordStoreInterface>((set) => ({
  uiState: "emailVerification",
  setUiState: (item) => set({ uiState: item }),
  verificationCode: "",
  setVerificationCode: (item) => set({ verificationCode: item }),
  email: "",
  setEmail: (item) => set({ email: item }),
}));

export default useResetPasswordStore;
