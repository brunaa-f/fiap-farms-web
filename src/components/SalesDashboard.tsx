import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';
import type { SaleRecord } from '../services/salesService';

interface SalesDashboardProps {
  sales: SaleRecord[];
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({ sales }) => {
  const chartData = useMemo(() => {
    const profitByProduct: { [key: string]: number } = {};
    sales.forEach(sale => {
      if (!profitByProduct[sale.productName]) {
        profitByProduct[sale.productName] = 0;
      }

      profitByProduct[sale.productName] += Number(sale.profit) || 0;
    });

    const sortedEntries = Object.entries(profitByProduct)
      .sort(([, a], [, b]) => a - b); 

    const categories = sortedEntries.map(([key]) => key);
    const data = sortedEntries.map(([, value]) => value);

    return {
      series: [{ name: 'Lucro (R$)', data: data }], 
      categories: categories,
    };
  }, [sales]);

  const options = {
    chart: {
      type: 'bar' as const,
      height: 350,
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        barHeight: '60%',
      }
    },
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `R$ ${val.toFixed(2)}`,
      style: {
        colors: ['#fff']
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        opacity: 0.45
      }
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        formatter: (val: string) => `R$ ${val}`
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px'
        }
      }
    },
    colors: ['#28a745'],
    tooltip: {
      y: {
        formatter: (val: number) => `R$ ${val.toFixed(2)}`
      }
    }
  };

  if (sales.length === 0) {
    return <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#6c757d' }}>Nenhuma venda registrada ainda.</p>;
  }

  return <Chart options={options} series={chartData.series} type="bar" height={350} />;
};
