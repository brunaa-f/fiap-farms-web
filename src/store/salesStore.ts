import { create } from 'zustand';
import { listenToSales } from '../services/salesService';
import type { SaleRecord } from '../services/salesService';

interface SalesState {
  sales: SaleRecord[];
  isLoading: boolean;
  listenToSales: (userId: string) => void;
  unsubscribe: () => void;
}

export const useSalesStore = create<SalesState>((set, get) => ({
  sales: [],
  isLoading: true,
  unsubscribe: () => {},

  listenToSales: (userId) => {
    get().unsubscribe();
    const unsubscribe = listenToSales(userId, (newSales) => {
      set({ sales: newSales, isLoading: false });
    });
    set({ unsubscribe });
  },
}));