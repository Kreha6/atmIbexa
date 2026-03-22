import { type StateCreator } from "zustand";
import Big from "big.js";

export type AtmState = {
  balance: Big;
  updateBalance: (amount: Big) => void;
};

export const createAtmSlice: StateCreator<AtmState> = (set, get) => ({
  balance: new Big(0),
  updateBalance: (amount: Big) => {
    set((state) => ({
      balance: state.balance.plus(amount),
    }));
  },
});
