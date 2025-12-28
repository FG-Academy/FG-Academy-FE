// Importing create function from the Zustand library
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TimerStoreInterface {
  seconds: number;
  minutes: number;
  increaseSeconds: () => void;
  setMinutes: (item: number | undefined) => void;
  increaseMinutes: () => void;
  resetTimer: () => void;
  setSeconds: (seconds: number) => void;
}

interface SecondsStoreInterface {
  seconds: number;
  increaseSeconds: () => void;
  setSeconds: (item: number) => void;
}

export const useSecondsStore = create(
  persist<SecondsStoreInterface>(
    (set) => ({
      seconds: 0,
      increaseSeconds: () => set((state) => ({ seconds: state.seconds + 1 })),
      setSeconds: (seconds) => set({ seconds }),
    }),
    { name: "TimerStore" }
  )
);

const useTimerStore = create<TimerStoreInterface>((set) => ({
  seconds: 0,
  minutes: 0,
  increaseSeconds: () => set((state) => ({ seconds: state.seconds + 1 })),
  increaseMinutes: () =>
    set((state) => ({
      minutes: state.minutes + 1,
    })),
  setMinutes: (item) => set(() => ({ minutes: item })),
  resetTimer: () => set({ seconds: 0, minutes: 0 }),
  setSeconds: (seconds) => set({ seconds }),
}));

// const useTimerStore = create(
//   persist<TimerStoreInterface>(
//     (set) => ({
//       timer: 0,
//       increaseTimer: () => set((state) => ({ timer: state.timer + 1 })),
//       seconds: 0,
//       minutes: 0,
//       increaseSeconds: () => set((state) => ({ seconds: state.seconds + 1 })),
//       increaseMinutes: () =>
//         set((state) => ({ minutes: Math.floor(state.seconds / 60) })),
//       resetTimer: () => set({ seconds: 0, minutes: 0 }),
//       setSeconds: (seconds) => set({ seconds }),
//     }),
//     { name: "TimerStore" }
//   )
// );

export default useTimerStore;
