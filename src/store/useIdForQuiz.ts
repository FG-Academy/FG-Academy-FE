import { create } from "zustand";

interface IdsStoreInterface {
  lectureId: number;
  setLectureId: (item: number) => void;
  courseId: number;
  setCourseId: (item: number) => void;
}

const useIdForQuizStore = create<IdsStoreInterface>((set) => ({
  lectureId: 0,
  setLectureId: (lectureId) => set({ lectureId }),
  courseId: 0,
  setCourseId: (courseId) => set({ courseId }),
}));

export default useIdForQuizStore;
