import { type StateCreator } from "zustand";

export type AtmState = {
  balance: number;
  updateBalance: (amount: number) => void;
};

export const createAtmSlice: StateCreator<AtmState> = (set, get) => ({
  balance: 1000,
  updateBalance: (amount: number) => {
    set((state) => ({
      balance: state.balance + amount,
    }));
  },
});
