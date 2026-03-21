import {create, type StateCreator } from 'zustand';
import { createAtmSlice, type AtmState } from './atmState/atm.slice';

export type StoreState = AtmState;


const createRootSlice: StateCreator<StoreState> = (...a) => ({
    ...createAtmSlice(...a)
})


export const useStore = create<StoreState>(createRootSlice);