import { create } from "zustand";

type UiState = "emailVerification" | "enterCode" | "resetPassword";

interface ResetPasswordStoreState {
  uiState: UiState;
  setUiState: (state: UiState) => void;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  email: string;
  setEmail: (email: string) => void;
  reset: () => void;
}

export const useResetPasswordStore = create<ResetPasswordStoreState>((set) => ({
  uiState: "emailVerification",
  setUiState: (state) => set({ uiState: state }),
  verificationCode: "",
  setVerificationCode: (code) => set({ verificationCode: code }),
  email: "",
  setEmail: (email) => set({ email }),
  reset: () =>
    set({
      uiState: "emailVerification",
      verificationCode: "",
      email: "",
    }),
}));
