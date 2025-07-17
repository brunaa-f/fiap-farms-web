import { collection, addDoc, serverTimestamp, query, where, getDocs, limit, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; 
import type { DocumentData } from 'firebase/firestore';

interface SaleData {
  productName: string;
  quantitySold: number;
  pricePerUnit: number;
}

export interface SaleRecord extends DocumentData {
  id: string;
  productName: string;
  profit: number;
}

/**
 * Busca o custo de um produto na coleção 'production_lots'.
 * @param productName - O nome do produto a ser buscado.
 * @param userId - O ID do usuário dono do produto.
 * @returns O custo por unidade do produto ou null se não for encontrado.
 */

const getProductCost = async (productName: string, userId: string): Promise<number | null> => {
  const q = query(
    collection(db, 'production_lots'),
    where('productName', '==', productName),
    where('ownerId', '==', userId),
    limit(1)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const productDoc = querySnapshot.docs[0];
    return productDoc.data().costPerUnit;
  }

  return null;
};

/**
 * Registra uma nova venda no Firestore, calculando o lucro.
 * @param saleData - Os dados da venda que vêm do formulário.
 * @param userId - O ID do usuário logado.
 */
export const recordSale = async (saleData: SaleData, userId: string) => {
  try {
    const costPerUnit = await getProductCost(saleData.productName, userId);

    if (costPerUnit === null) {
      throw new Error(`Produto "${saleData.productName}" não encontrado nos seus lotes de produção.`);
    }

    const totalRevenue = saleData.quantitySold * saleData.pricePerUnit;
    const totalCost = saleData.quantitySold * costPerUnit;
    const profit = totalRevenue - totalCost;
    const docRef = await addDoc(collection(db, 'sales_records'), {
      ...saleData,
      ownerId: userId,
      saleDate: serverTimestamp(),
      costPerUnit: costPerUnit, 
      totalRevenue: totalRevenue,
      profit: profit,
    });

    console.log("✅ Venda registrada com o ID: ", docRef.id);
    return { success: true, id: docRef.id };

  } catch (error) {
    console.error("❌ Erro ao registrar a venda: ", error);
    return { success: false, error: (error as Error).message };
  }
};

export const listenToSales = (userId: string, callback: (sales: SaleRecord[]) => void) => {
  const q = query(collection(db, 'sales_records'), where('ownerId', '==', userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const sales: SaleRecord[] = [];
    querySnapshot.forEach((doc) => {
      sales.push({ id: doc.id, ...doc.data() } as SaleRecord);
    });
    callback(sales);
  });

  return unsubscribe;
};
