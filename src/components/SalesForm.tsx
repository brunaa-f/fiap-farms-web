import React, { useState } from 'react';

// Define a "forma" dos dados que o formulário vai enviar
interface SaleFormData {
  productName: string;
  quantitySold: number;
  pricePerUnit: number;
}

// Define as props que o componente espera receber
interface SalesFormProps {
  onSave: (data: SaleFormData) => void;
  onClose: () => void;
}

// Estilos CSS simples para a web
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
  input: {
    width: 'calc(100% - 22px)',
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
    backgroundColor: '#28a745', // Verde para vendas
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  }
};

export const SalesForm: React.FC<SalesFormProps> = ({ onSave, onClose }) => {
  const [productName, setProductName] = useState('');
  const [quantitySold, setQuantitySold] = useState('');
  const [pricePerUnit, setPricePerUnit] = useState('');

  const handleSave = () => {
    if (!productName || !quantitySold || !pricePerUnit) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave({
      productName,
      quantitySold: parseFloat(quantitySold),
      pricePerUnit: parseFloat(pricePerUnit),
    });
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Registrar Nova Venda</p>
      
      <input
        style={styles.input}
        placeholder="Nome do Produto Vendido"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Quantidade Vendida"
        value={quantitySold}
        onChange={(e) => setQuantitySold(e.target.value)}
        type="number"
      />
      <input
        style={styles.input}
        placeholder="Preço por Unidade"
        value={pricePerUnit}
        onChange={(e) => setPricePerUnit(e.target.value)}
        type="number"
      />
      
      <button style={styles.button} onClick={handleSave}>
        Salvar Venda
      </button>
      <button style={{...styles.button, ...styles.cancelButton}} onClick={onClose}>
        Cancelar
      </button>
    </div>
  );
};
