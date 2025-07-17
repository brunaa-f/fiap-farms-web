import React, { useState, useEffect } from 'react';

import { useUserStore } from '../store/userStore';
import { useProductionStore } from '../store/productionStore'; // ✅ NOVO
import { auth } from '../services/firebase';
import { createLot } from '../services/productionService';
import { recordSale } from '../services/salesService';
import { ProductionForm } from '../components/ProductionForm';
import { SalesForm } from '../components/SalesForm';
import { ProductionDashboard } from '../components/ProductionDashboard'; // ✅ NOVO

// Estilos CSS
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
  dashboardSection: {
    marginTop: '40px',
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

export const Dashboard = () => {
  const { user } = useUserStore();
  const { lots, isLoading, listenToLots, unsubscribe } = useProductionStore();

  const [isProductionModalOpen, setProductionModalOpen] = useState(false);
  const [isSalesModalOpen, setSalesModalOpen] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      listenToLots(user.uid);
    }

    return () => {
      unsubscribe();
    };
  }, [user]); 

  const handleLogout = () => {
    auth.signOut();
  };

  const handleSaveProduction = async (formData: { productName: string; costPerUnit: number; status: string }) => {
    if (!user) { alert("Erro: usuário não autenticado."); return; }
    const result = await createLot(formData, user.uid);
    if (result.success) { alert("Sucesso! Lote de produção salvo."); setProductionModalOpen(false); } 
    else { alert(`Erro ao salvar: ${result.error}`); }
  };

  const handleSaveSale = async (formData: { productName: string; quantitySold: number; pricePerUnit: number; }) => {
    if (!user) { alert("Erro: usuário não autenticado."); return; }
    const result = await recordSale(formData, user.uid);
    if (result.success) { alert("Sucesso! Venda registrada."); setSalesModalOpen(false); } 
    else { alert(`Erro ao registrar venda: ${result.error}`); }
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

      {/* ✅ NOVO: Seção para exibir o dashboard de produção */}
      <section style={styles.dashboardSection}>
        <h2 style={styles.sectionTitle}>Status da Produção</h2>
        {isLoading ? (
          <p>Carregando dados...</p>
        ) : (
          <ProductionDashboard lots={lots} />
        )}
      </section>

      <div style={styles.logoutButtonContainer}>
        <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </div>

      {/* Modais (código existente) */}
      {isProductionModalOpen && (
        <div style={styles.modalOverlay}><ProductionForm onSave={handleSaveProduction} onClose={() => setProductionModalOpen(false)} /></div>
      )}
      {isSalesModalOpen && (
        <div style={styles.modalOverlay}><SalesForm onSave={handleSaveSale} onClose={() => setSalesModalOpen(false)} /></div>
      )}
    </div>
  );
};
