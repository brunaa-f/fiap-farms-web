import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useProductionStore } from '../store/productionStore';
import { useSalesStore } from '../store/salesStore';
import { auth } from '../services/firebase';
import { createLot } from '../services/productionService';
import { recordSale } from '../services/salesService';
import { ProductionForm } from '../components/ProductionForm';
import { SalesForm } from '../components/SalesForm';
import { ProductionDashboard } from '../components/ProductionDashboard';
import { SalesDashboard } from '../components/SalesDashboard';

const styles: { [key: string]: React.CSSProperties } = {
  dashboardContainer: {
    padding: '40px',
    fontFamily: 'sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
  },
  welcomeMessage: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: '20px 0',
  },
  actionButton: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  productionButton: {
    backgroundColor: '#007bff',
  },
  salesButton: {
    backgroundColor: '#28a745',
  },
  dashboardsContainer: {
    display: 'flex',
    gap: '30px',
    marginTop: '40px',
    flexWrap: 'wrap',
  },
  dashboardBox: {
    flex: 1,
    minWidth: '450px',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  logoutButtonContainer: {
    textAlign: 'center',
    marginTop: '50px',
  },
  logoutButton: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
};

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

  const handleLogout = () => auth.signOut();

  const handleSaveProduction = async (formData: ProductionFormData) => { 
    if (!user) return; 
    const result = await createLot(formData, user.uid); 
    if(result.success) { 
      alert("Sucesso!"); 
      setProductionModalOpen(false); 
    }
  };

  const handleSaveSale = async (formData: SaleFormData) => { 
    if (!user) return; 
    const result = await recordSale(formData, user.uid); 
    if(result.success) { 
      alert("Sucesso!"); 
      setSalesModalOpen(false); 
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h1>Dashboard</h1>
        <p style={styles.welcomeMessage}>Bem-vindo, {user?.email}! Você está logado.</p>
        <div style={styles.actionsContainer}>
          <button style={{...styles.actionButton, ...styles.productionButton}} onClick={() => setProductionModalOpen(true)}>+ Adicionar Produção</button>
          <button style={{...styles.actionButton, ...styles.salesButton}} onClick={() => setSalesModalOpen(true)}>+ Registrar Venda</button>
        </div>
      </header>

      <main style={styles.dashboardsContainer}>
        <section style={styles.dashboardBox}>
          <h2 style={styles.sectionTitle}>Status da Produção</h2>
          {production.isLoading ? <p>Carregando...</p> : <ProductionDashboard lots={production.lots} />}
        </section>
        
        <section style={styles.dashboardBox}>
          <h2 style={styles.sectionTitle}>Lucro por Produto</h2>
          {sales.isLoading ? <p>Carregando...</p> : <SalesDashboard sales={sales.sales} />}
        </section>
      </main>

      <div style={styles.logoutButtonContainer}><button style={styles.logoutButton} onClick={handleLogout}>Sair</button></div>

      {isProductionModalOpen && (<div style={styles.modalOverlay}><ProductionForm onSave={handleSaveProduction} onClose={() => setProductionModalOpen(false)} /></div>)}
      {isSalesModalOpen && (<div style={styles.modalOverlay}><SalesForm onSave={handleSaveSale} onClose={() => setSalesModalOpen(false)} /></div>)}
    </div>
  );
};
