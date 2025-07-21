import React, { useMemo } from 'react';
import type { ProductionLot } from '../services/productionService';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

interface ProductionDashboardProps {
  lots: ProductionLot[];
  onUpdateStatus: (lotId: string, newStatus: string) => void;
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
  container: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: '20px' },
  column: { width: '32%', backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  columnTitleContainer: { display: 'flex', alignItems: 'center', paddingBottom: '10px', marginBottom: '10px', borderBottom: '2px solid #e9ecef' },
  columnTitle: { fontSize: '18px', fontWeight: '600', color: '#343a40', margin: 0 },
  itemCount: { marginLeft: 'auto', backgroundColor: '#e9ecef', color: '#495057', borderRadius: '12px', padding: '2px 8px', fontSize: '14px', fontWeight: '600' },
  card: { backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', borderLeft: '4px solid' },
  cardText: { fontSize: '16px', fontWeight: '500', margin: '0 0 10px 0', color: '#495057' },
  actionsContainer: { display: 'flex', gap: '8px', marginTop: '10px' },
  actionButton: { border: '1px solid #ddd', backgroundColor: '#f8f8f8', borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center' },
  emptyText: { fontSize: '14px', color: '#6c757d', textAlign: 'center', fontStyle: 'italic', margin: '20px 0' },
};

const KanbanCard: React.FC<{ item: ProductionLot }> = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id, // ID único para o item arrastável
    data: { currentStatus: item.status } // Passando o status atual para o evento
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 100 
  } : undefined;

  return (
    <div ref={setNodeRef} style={{...styles.card, ...style}} {...listeners} {...attributes}>
      <p style={styles.cardText}>{item.productName}</p>
    </div>
  );
};

const KanbanColumn: React.FC<{ status: string; title: string; items: ProductionLot[]; icon: React.ReactNode; color: string; }> = ({ status, title, items, icon, color }) => {
  const { setNodeRef } = useDroppable({
    id: status, 
  });

  return (
    <div ref={setNodeRef} style={{ ...styles.column, borderLeftColor: color }}>
      <div style={styles.columnTitleContainer}>
        {icon}
        <p style={styles.columnTitle}>{title}</p>
        <span style={styles.itemCount}>{items.length}</span>
      </div>
      {items.length === 0 ? (
        <p style={styles.emptyText}>- Vazio -</p>
      ) : (
        items.map(item => (
          <KanbanCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
};

export const ProductionDashboard: React.FC<ProductionDashboardProps> = ({ lots, onUpdateStatus }) => {
  const filteredLots = useMemo(() => {
    const aguardando = lots.filter(lot => lot.status === 'Aguardando');
    const emProducao = lots.filter(lot => lot.status === 'Em Produção');
    const colhido = lots.filter(lot => lot.status === 'Colhido');
    return { aguardando, emProducao, colhido };
  }, [lots]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const cardId = active.id as string;
    const originStatus = active.data.current?.currentStatus as string;
    const destinationStatus = over.id as string;

    if (originStatus === destinationStatus) {
      return;
    }
    
    onUpdateStatus(cardId, destinationStatus);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={styles.container}>
        <KanbanColumn status="Aguardando" title="Aguardando" items={filteredLots.aguardando} icon={<ClockIcon />} color="#ffc107" />
        <KanbanColumn status="Em Produção" title="Em Produção" items={filteredLots.emProducao} icon={<GearIcon />} color="#007bff" />
        <KanbanColumn status="Colhido" title="Colhido" items={filteredLots.colhido} icon={<CheckIcon />} color="#28a745" />
      </div>
    </DndContext>
  );
};