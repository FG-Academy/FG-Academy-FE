// Importing create function from the Zustand library
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DurationStoreInterface {
  duration: number;
  setDuration: (item: number) => void;
  totalMinute: number;
  setTotalMinute: (item: number) => void;
}

const useDurationStore = create<DurationStoreInterface>((set) => ({
  duration: 0,
  setDuration: (item) => set({ duration: item }),
  totalMinute: 0,
  setTotalMinute: (item) => set({ totalMinute: item }),
}));

export default useDurationStore;
