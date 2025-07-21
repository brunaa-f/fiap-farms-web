import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useProductionStore } from '../store/productionStore';
import { useSalesStore } from '../store/salesStore';
import { auth } from '../services/firebase';
import { recordSale } from '../services/salesService';
import { ProductionForm } from '../components/ProductionForm';
import { SalesForm } from '../components/SalesForm';
import { ProductionDashboard } from '../components/ProductionDashboard';
import { SalesDashboard } from '../components/SalesDashboard';
import { Header } from '../components/Header';
import { createLot, updateLotStatus } from '../services/productionService';

interface ProductionFormData {
  productName: string;
  costPerUnit: number;
  status: string;
}

interface SaleFormData {
  productName: string;
  quantitySold: number;
  pricePerUnit: number;
}

export const Dashboard = () => {
  const { user } = useUserStore();
  const production = useProductionStore();
  const sales = useSalesStore();

  const [isProductionModalOpen, setProductionModalOpen] = useState(false);
  const [isSalesModalOpen, setSalesModalOpen] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      production.listenToLots(user.uid);
      sales.listenToSales(user.uid);
    }
    return () => {
      production.unsubscribe();
      sales.unsubscribe();
    };
  }, [user]);

  const handleUpdateLotStatus = async (lotId: string, newStatus: string) => {
    await updateLotStatus(lotId, newStatus);
  };

  const handleLogout = () => auth.signOut();

  const handleSaveProduction = async (formData: ProductionFormData) => {
    if (!user) return;
    await createLot(formData, user.uid);
    alert("Produção salva!");
    setProductionModalOpen(false);
  };

  const handleSaveSale = async (formData: SaleFormData) => {
    if (!user) return;
    await recordSale(formData, user.uid);
    alert("Venda registrada!");
    setSalesModalOpen(false);
  };

  return (
    <div style={styles.pageContainer}>
      <Header farmName={user?.displayName} onLogout={handleLogout} />
      
      <main style={styles.mainContent}>
        <div style={styles.pageHeader}>
          <div style={styles.actionsContainer}>
            <button style={{ ...styles.actionButton, ...styles.productionButton }} onClick={() => setProductionModalOpen(true)}>+ Adicionar Produção</button>
            <button style={{ ...styles.actionButton, ...styles.salesButton }} onClick={() => setSalesModalOpen(true)}>+ Registrar Venda</button>
          </div>
        </div>

        <div style={styles.grid}>
          <section style={{ ...styles.card, ...styles.largeCard }}>
            <h2 style={styles.cardTitle}>Status da Produção</h2>
            {production.isLoading ? <p>Carregando...</p> : 
              <ProductionDashboard 
                lots={production.lots} 
                onUpdateStatus={handleUpdateLotStatus}
              />
            }
          </section>
          
          <section style={{ ...styles.card, ...styles.largeCard }}>
            <h2 style={styles.cardTitle}>Lucro por Produto</h2>
            {sales.isLoading ? <p>Carregando...</p> : <SalesDashboard sales={sales.sales} />}
          </section>
        </div>
      </main>

      {isProductionModalOpen && (
        <div style={styles.modalOverlay}>
          <ProductionForm onSave={handleSaveProduction} onClose={() => setProductionModalOpen(false)} />
        </div>
      )}
      {isSalesModalOpen && (
        <div style={styles.modalOverlay}>
          <SalesForm onSave={handleSaveSale} onClose={() => setSalesModalOpen(false)} />
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-light)' },
  mainContent: { flex: 1, padding: '32px', overflowY: 'auto' },
  pageHeader: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '32px' },
  pageTitle: { fontSize: '28px', fontWeight: '700' },
  actionsContainer: { display: 'flex', gap: '16px' },
  actionButton: { padding: '10px 20px', fontSize: '15px', fontWeight: '500', cursor: 'pointer', color: 'white', border: 'none', borderRadius: '8px', transition: 'opacity 0.2s' },
  productionButton: { backgroundColor: 'var(--primary-accent)' },
  salesButton: { backgroundColor: 'var(--success-green)' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '24px' },
  card: { backgroundColor: 'var(--card-bg)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
  largeCard: { gridColumn: 'span 2' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: 'var(--text-secondary)' },
  cardValue: { fontSize: '32px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' },
  cardTrend: { fontSize: '14px', fontWeight: '500' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
};