import { create } from "zustand";

interface SelectedCourseIdStoreInterface {
  selectedCourseId: number | null;
  setSelectedCourseId: (item: number | null) => void;
}

const useSelectedCourseIdStore = create<SelectedCourseIdStoreInterface>(
  (set) => ({
    selectedCourseId: null,
    setSelectedCourseId: (item) => set({ selectedCourseId: item }),
  })
);

export default useSelectedCourseIdStore;
