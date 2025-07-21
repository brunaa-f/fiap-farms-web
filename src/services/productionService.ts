import { collection, addDoc, serverTimestamp, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import { db } from './firebase';

interface LotData {
  productName: string;
  costPerUnit: number;
  status: string;
}

export interface ProductionLot extends DocumentData {
  id: string;
  productName: string;
  costPerUnit: number;
  status: string;
}

/**
 * @param lotData - Os dados que o usuário preencheu no formulário.
 * @param userId - O ID do usuário que está logado.
 */
export const createLot = async (lotData: LotData, userId: string) => {
  try {
    const docRef = await addDoc(collection(db, 'production_lots'), {
      ...lotData,
      ownerId: userId,
      creationDate: serverTimestamp(),
    });

    console.log("✅ Lote de produção salvo com o ID: ", docRef.id);
    return { success: true, id: docRef.id };

  } catch (error) {

    console.error("❌ Erro ao salvar o lote de produção: ", error);
    return { success: false, error: (error as Error).message };
  }
};

export const listenToProductionLots = (userId: string, callback: (lots: ProductionLot[]) => void) => {
  const q = query(collection(db, 'production_lots'), where('ownerId', '==', userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const lots: ProductionLot[] = [];
    querySnapshot.forEach((doc) => {
      lots.push({ id: doc.id, ...doc.data() } as ProductionLot);
    });

    callback(lots);
  });

  return unsubscribe;
};

/**
 * ✅ Atualiza o status de um lote de produção específico.
 * @param lotId - O ID do documento do lote a ser atualizado.
 * @param newStatus - O novo status ('Aguardando', 'Em Produção', 'Colhido').
 */
export const updateLotStatus = async (lotId: string, newStatus: string) => {
  try {
    const lotRef = doc(db, 'production_lots', lotId);
    await updateDoc(lotRef, {
      status: newStatus
    });
    console.log(`✅ Status do lote ${lotId} atualizado para ${newStatus}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Erro ao atualizar o status do lote: ", error);
    return { success: false, error: (error as Error).message };
  }
};