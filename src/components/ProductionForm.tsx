import React, { useState } from 'react';

// Define os "tipos" das funções que este componente espera receber
interface ProductionFormProps {
  onSave: (data: { productName: string; costPerUnit: number; status: string }) => void;
  onClose: () => void;
}

// Estilos CSS simples para a web em formato de objeto
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '400px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    textAlign: 'left',
    fontSize: '14px',
    color: '#333',
  },
  input: {
    width: 'calc(100% - 22px)', // Desconta padding e borda
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  }
};


export const ProductionForm: React.FC<ProductionFormProps> = ({ onSave, onClose }) => {
  const [productName, setProductName] = useState('');
  const [costPerUnit, setCostPerUnit] = useState('');
  // ✅ MUDANÇA: O status agora é controlado pelo estado do componente.
  const [status, setStatus] = useState('Aguardando'); 

  const handleSave = () => {
    if (!productName || !costPerUnit) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    // Passa o status que foi selecionado pelo usuário.
    onSave({
      productName,
      costPerUnit: parseFloat(costPerUnit),
      status,
    });
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Adicionar Novo Lote de Produção</p>
      
      <label style={styles.label} htmlFor="product-name">Nome do Produto</label>
      <input
        id="product-name"
        style={styles.input}
        placeholder="ex: Tomate Cereja"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label style={styles.label} htmlFor="cost-per-unit">Custo por Unidade</label>
      <input
        id="cost-per-unit"
        style={styles.input}
        placeholder="ex: 2.50"
        value={costPerUnit}
        onChange={(e) => setCostPerUnit(e.target.value)}
        type="number"
      />
      
      {/* ✅ MUDANÇA: Adicionado um campo de seleção para o Status */}
      <label style={styles.label} htmlFor="status-select">Status</label>
      <select 
        id="status-select"
        style={styles.input}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Aguardando">Aguardando</option>
        <option value="Em Produção">Em Produção</option>
        <option value="Colhido">Colhido</option>
      </select>

      <button style={styles.button} onClick={handleSave}>
        Salvar Lote
      </button>
      <button style={{...styles.button, ...styles.cancelButton}} onClick={onClose}>
        Cancelar
      </button>
    </div>
  );
};
