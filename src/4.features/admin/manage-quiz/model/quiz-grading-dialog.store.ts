import { create } from "zustand";

interface QuizGradingDialogStore {
  open: boolean;
  userId: number;
  quizId: number;
  setOpen: (open: boolean) => void;
  openDialog: (userId: number, quizId: number) => void;
  closeDialog: () => void;
}

export const useQuizGradingDialogStore = create<QuizGradingDialogStore>(
  (set) => ({
    open: false,
    userId: 0,
    quizId: 0,
    setOpen: (open) => set({ open }),
    openDialog: (userId, quizId) => set({ open: true, userId, quizId }),
    closeDialog: () => set({ open: false, userId: 0, quizId: 0 }),
  })
);
