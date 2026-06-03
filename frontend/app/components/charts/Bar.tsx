"use client";

import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import "@/lib/register";

// Lógica de cores baseada na tendência (comparação com o mês anterior)
function getTrendColors(values: number[]) {
  return values.map((value, i) => (i === 0 || value >= values[i - 1] ? "#25d488" : "#f26161"));
}

const values = [4.5, 7.8, 6.2, 11.5, 7, 8.8, 11, 13.5, 12.5, 13.5, 11, 7.8];

const defaultData: ChartData<"bar", number[], string> = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  datasets: [
    {
      data: values,
      backgroundColor: getTrendColors(values),
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.7, // Ajusta a largura das barras proporcionalmente
    },
  ],
};

const defaultOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 2,
        color: "#4a4c51",
        font: { size: 12 },
      },
      grid: {
        color: "#d4d4d4",
        drawTicks: false,
      },
      border: { display: false },
    },
    x: {
      ticks: {
        color: "#4a4c51",
        font: { size: 12 },
      },
      grid: { display: false },
      border: { display: false },
    },
  },
};

export default function SalesChart() {
  return (
    <div className="w-auto p-8 border border-gray-200 rounded-2xl font-sans text-gray-800">
      {/* Header do Card */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-800">Progresso da Renda</h2>
          <p className="text-sm text-gray-500">Acompanhe a trajetória da sua renda.</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-xs font-medium text-gray-600">Selecionar período</label>
          <select className="border-1 border-gray-300 rounded-md px-6 py-1.5 text-sm outline-none cursor-pointer hover:bg-gray-100 transition-colors">
            <option>Anual</option>
            <option>Mensal</option>
          </select>
        </div>
      </div>

      {/* Conteúdo Principal (Gráfico + Legenda lateral) */}
      <div className="flex gap-6">
        <div className="flex-1 h-[300px]">
          <Bar data={defaultData} options={defaultOptions} />
        </div>

        {/* Legenda Lateral */}
        <div className="flex flex-col gap-4 mt-12 min-w-[120px]">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#34D399] rounded-[4px]" />
            <span className="text-sm font-medium">Increase</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#FF6262] rounded-[4px]" />
            <span className="text-sm font-medium">Decrease</span>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-700">Currency: £ (GBP)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
