import { create } from 'zustand';
import { listenToProductionLots } from '../services/productionService';
import type { ProductionLot } from '../services/productionService';


interface ProductionState {
  lots: ProductionLot[];
  isLoading: boolean;      
  setLots: (lots: ProductionLot[]) => void;
  unsubscribe: () => void; 
  listenToLots: (userId: string) => void; 
}

export const useProductionStore = create<ProductionState>((set, get) => ({
  // Estado inicial
  lots: [],
  isLoading: true,
  unsubscribe: () => {}, 

  setLots: (lots) => {
    set({ lots, isLoading: false });
  },


  listenToLots: (userId) => {
    get().unsubscribe(); 
    const unsubscribe = listenToProductionLots(userId, (newLots) => {
      get().setLots(newLots);
    });
    set({ unsubscribe });
  },
}));
