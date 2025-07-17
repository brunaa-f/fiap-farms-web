import React, { useMemo } from 'react';
import type { ProductionLot } from '../services/productionService';

interface ProductionDashboardProps {
  lots: ProductionLot[];
}

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
    <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const GearIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
    <path d="M12 20v-4 M12 4v4 M20 12h-4 M4 12h4 M17.66 6.34l-2.83 2.83 M6.34 17.66l2.83-2.83 M17.66 17.66l-2.83-2.83 M6.34 6.34l2.83 2.83"></path><circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: '20px',
  },
  column: {
    width: '32%',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  columnTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
    marginBottom: '10px',
    borderBottom: '2px solid #e9ecef',
  },
  columnTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#343a40',
    margin: 0,
  },
  itemCount: {
    marginLeft: 'auto',
    backgroundColor: '#e9ecef',
    color: '#495057',
    borderRadius: '12px',
    padding: '2px 8px',
    fontSize: '14px',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderLeft: '4px solid', 
  },
  cardText: {
    fontSize: '16px',
    fontWeight: '500',
    margin: 0,
    color: '#495057',
  },
  emptyText: {
    fontSize: '14px',
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic',
    margin: '20px 0',
  },
};


const KanbanColumn: React.FC<{ title: string; items: ProductionLot[]; icon: React.ReactNode; color: string }> = ({ title, items, icon, color }) => (
  <div style={styles.column}>
    <div style={styles.columnTitleContainer}>
      {icon}
      <p style={styles.columnTitle}>{title}</p>
      <span style={styles.itemCount}>{items.length}</span>
    </div>
    {items.length === 0 ? (
      <p style={styles.emptyText}>- Vazio -</p>
    ) : (
      items.map(item => (
        <div key={item.id} style={{ ...styles.card, borderLeftColor: color }}>
          <p style={styles.cardText}>{item.productName}</p>
        </div>
      ))
    )}
  </div>
);

export const ProductionDashboard: React.FC<ProductionDashboardProps> = ({ lots }) => {
  const filteredLots = useMemo(() => {
    const aguardando = lots.filter(lot => lot.status === 'Aguardando');
    const emProducao = lots.filter(lot => lot.status === 'Em Produção');
    const colhido = lots.filter(lot => lot.status === 'Colhido');
    return { aguardando, emProducao, colhido };
  }, [lots]);

  return (
    <div style={styles.container}>
      <KanbanColumn title="Aguardando" items={filteredLots.aguardando} icon={<ClockIcon />} color="#ffc107" />
      <KanbanColumn title="Em Produção" items={filteredLots.emProducao} icon={<GearIcon />} color="#007bff" />
      <KanbanColumn title="Colhido" items={filteredLots.colhido} icon={<CheckIcon />} color="#28a745" />
    </div>
  );
};
