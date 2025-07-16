import React, { useState } from 'react';

// Importando tudo que precisamos
import { useUserStore } from '../store/userStore';
import { auth } from '../services/firebase';
import { createLot } from '../services/productionService';
import { ProductionForm } from '../components/ProductionForm';

// Estilos CSS em formato de objeto para a web.
// Isso substitui o `StyleSheet` do React Native.
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
  actionButton: {
    padding: '12px 24px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    margin: '20px 0',
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

// Este é o componente Dashboard corrigido.
// Note que usamos `div`, `p`, e `button` em vez de `View`, `Text`, e `Button`.
export const Dashboard = () => {
  const { user } = useUserStore();
  const [isModalOpen, setModalOpen] = useState(false);

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
      setModalOpen(false);
    } else {
      alert(`Erro ao salvar: ${result.error}`);
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      <p style={styles.welcomeMessage}>Bem-vindo, {user?.email}! Você está logado.</p>
      
      {/* Botão para abrir o modal */}
      <button style={styles.actionButton} onClick={() => setModalOpen(true)}>
        + Adicionar Produção
      </button>
      
      <div>
        <button style={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </div>

      {/* Este é o nosso Modal para a web. 
        É apenas uma `div` que cobre a tela inteira e aparece ou desaparece
        dependendo do estado `isModalOpen`.
      */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <ProductionForm
            onSave={handleSaveProduction}
            onClose={() => setModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
