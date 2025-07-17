import React, { useState } from 'react';

// Importando tudo que precisamos
import { useUserStore } from '../store/userStore';
import { auth } from '../services/firebase';
import { createLot } from '../services/productionService';
import { recordSale } from '../services/salesService'; // ✅ NOVO: Importa o serviço de vendas
import { ProductionForm } from '../components/ProductionForm';
import { SalesForm } from '../components/SalesForm'; // ✅ NOVO: Importa o formulário de vendas

// Estilos CSS
const styles: { [key: string]: React.CSSProperties } = {
  dashboardContainer: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  welcomeMessage: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  // ✅ NOVO: Container para os botões de ação
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px', // Espaço entre os botões
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
    backgroundColor: '#007bff', // Azul
  },
  salesButton: {
    backgroundColor: '#28a745', // Verde
  },
  logoutButton: {
    padding: '8px 16px',
    cursor: 'pointer',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '30px',
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
  const [isProductionModalOpen, setProductionModalOpen] = useState(false);
  const [isSalesModalOpen, setSalesModalOpen] = useState(false); // ✅ NOVO: Estado para o modal de vendas

  const handleLogout = () => {
    auth.signOut();
  };

  const handleSaveProduction = async (formData: { productName: string; costPerUnit: number; status:string }) => {
    if (!user) {
      alert("Erro: usuário não autenticado.");
      return;
    }
    const result = await createLot(formData, user.uid);
    if (result.success) {
      alert("Sucesso! Lote de produção salvo.");
      setProductionModalOpen(false);
    } else {
      alert(`Erro ao salvar: ${result.error}`);
    }
  };

  // ✅ NOVO: Função para salvar a venda
  const handleSaveSale = async (formData: { productName: string; quantitySold: number; pricePerUnit: number; }) => {
    if (!user) {
      alert("Erro: usuário não autenticado.");
      return;
    }
    const result = await recordSale(formData, user.uid);
    if (result.success) {
      alert("Sucesso! Venda registrada.");
      setSalesModalOpen(false);
    } else {
      alert(`Erro ao registrar venda: ${result.error}`);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      <p style={styles.welcomeMessage}>Bem-vindo, {user?.email}! Você está logado.</p>
      
      <div style={styles.actionsContainer}>
        <button style={{...styles.actionButton, ...styles.productionButton}} onClick={() => setProductionModalOpen(true)}>
          + Adicionar Produção
        </button>
        {/* ✅ NOVO: Botão para abrir o modal de vendas */}
        <button style={{...styles.actionButton, ...styles.salesButton}} onClick={() => setSalesModalOpen(true)}>
          + Registrar Venda
        </button>
      </div>
      
      <div>
        <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </div>

      {/* Modal de Produção (código existente) */}
      {isProductionModalOpen && (
        <div style={styles.modalOverlay}>
          <ProductionForm
            onSave={handleSaveProduction}
            onClose={() => setProductionModalOpen(false)}
          />
        </div>
      )}

      {/* ✅ NOVO: Modal de Vendas */}
      {isSalesModalOpen && (
        <div style={styles.modalOverlay}>
          <SalesForm
            onSave={handleSaveSale}
            onClose={() => setSalesModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};