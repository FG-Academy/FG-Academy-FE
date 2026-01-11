import { create } from "zustand";

interface QuizRegisterDialogStore {
  open: boolean;
  lectureId: number;
  setOpen: (open: boolean) => void;
  openDialog: (lectureId: number) => void;
  closeDialog: () => void;
}

export const useQuizRegisterDialogStore = create<QuizRegisterDialogStore>(
  (set) => ({
    open: false,
    lectureId: 0,
    setOpen: (open) => set({ open }),
    openDialog: (lectureId) => set({ open: true, lectureId }),
    closeDialog: () => set({ open: false, lectureId: 0 }),
  })
);
