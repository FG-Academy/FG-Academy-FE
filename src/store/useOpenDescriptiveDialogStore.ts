import { create } from "zustand";

interface OpenDialogStoreInterface {
  open: boolean;
  setOpen: (item: boolean) => void;
  userId: number;
  setUserId: (item: number) => void;
  quizId: number;
  setQuizId: (item: number) => void;
}

const useOpenDescriptiveDialogStore = create<OpenDialogStoreInterface>(
  (set) => ({
    open: false,
    setOpen: (item) => set({ open: item }),
    userId: 0,
    setUserId: (item) => set({ userId: item }),
    quizId: 0,
    setQuizId: (item) => set({ quizId: item }),
  })
);

export default useOpenDescriptiveDialogStore;
