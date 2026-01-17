import { create } from "zustand";

interface SelectedCourseStore {
  selectedCourseId: number | null;
  setSelectedCourseId: (courseId: number | null) => void;
}

export const useSelectedCourseStore = create<SelectedCourseStore>((set) => ({
  selectedCourseId: null,
  setSelectedCourseId: (courseId) => set({ selectedCourseId: courseId }),
}));
