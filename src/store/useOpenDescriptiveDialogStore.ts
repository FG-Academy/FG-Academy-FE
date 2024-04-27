import { create } from "zustand";

interface OpenDialogStoreInterface {
  open: boolean;
  setOpen: (item: boolean) => void;
}

const useOpenDescriptiveDialogStore = create<OpenDialogStoreInterface>(
  (set) => ({
    open: false,
    setOpen: (item) => set({ open: item }),
  })
);

export default useOpenDescriptiveDialogStore;
