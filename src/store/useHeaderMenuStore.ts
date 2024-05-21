import { create } from "zustand";

interface OpenMenuStoreInterface {
  isOpen: boolean;
  setIsOpen: (item: boolean) => void;
}

const useOpenMenuStore = create<OpenMenuStoreInterface>((set) => ({
  isOpen: false,
  setIsOpen: (item) => set({ isOpen: item }),
}));

export default useOpenMenuStore;
