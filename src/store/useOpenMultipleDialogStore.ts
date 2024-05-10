import { create } from "zustand";

interface OpenDialogStoreInterface {
  open: boolean;
  setOpen: (item: boolean) => void;
  userId: number;
  setUserId: (item: number) => void;
}

const useOpenMultipleDialogStore = create<OpenDialogStoreInterface>((set) => ({
  open: false,
  setOpen: (item) => set({ open: item }),
  userId: 0,
  setUserId: (item) => set({ userId: item }),
}));

export default useOpenMultipleDialogStore;
