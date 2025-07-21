import React, { useMemo } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { SaleRecord } from "../services/salesService";

interface SalesDashboardProps {
  sales: SaleRecord[];
}

export const SalesDashboard: React.FC<SalesDashboardProps> = ({ sales }) => {
  const chartData = useMemo(() => {
    const profitByProduct: { [key: string]: number } = {};
    let totalProfit = 0;
    sales.forEach((sale) => {
      const profit = Number(sale.profit) || 0;
      if (!profitByProduct[sale.productName]) {
        profitByProduct[sale.productName] = 0;
      }

      profitByProduct[sale.productName] += profit;
      totalProfit += profit;
    });

    const sortedEntries = Object.entries(profitByProduct)
    .sort(([, a], [, b]) => a - b);

    const categories = sortedEntries.map(([key]) => key);
    const data = sortedEntries.map(([, value]) => value);

    return {
      series: [{ name: "Lucro (R$)", data: data }],
      categories: categories,
      totalProfit: totalProfit,
    };
  }, [sales]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      fontFamily: "sans-serif",
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "55%",
        horizontal: false,
      },
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      show: false,
    },

    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: "#6E7A8A",
          fontSize: "14px",
        },
      },

      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#6E7A8A",
          fontSize: "12px",
        },
        formatter: (val: number) => `R$ ${val.toFixed(0)}`,
      },
    },

    colors: ["#8FA8C0"],
    tooltip: {
      y: {
        formatter: (val: number) => `R$ ${val.toFixed(2).replace(".", ",")}`,
      },
      style: { fontSize: "14px" },
      marker: { show: false },
    },
  };

  if (sales.length === 0) {
    return (
      <p style={{ textAlign: "center", fontStyle: "italic", color: "#6c757d" }}>
        Nenhuma venda registrada ainda.
      </p>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <div>
          <h1 style={{ margin: "4px 0 0 0", color: "#333", fontSize: "32px" }}>
            R$ {chartData.totalProfit.toFixed(2).replace(".", ",")}
          </h1>
        </div>

        <div
          style={{
            backgroundColor: "rgba(32, 191, 126, 0.1)",
            color: "#20BF7E",
            padding: "4px 8px",
            borderRadius: "16px",
            fontSize: "12px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
          }}
        ></div>
      </div>

      <Chart
        options={options}
        series={chartData.series}
        type="bar"
        height={300}
      />
    </>
  );
};
