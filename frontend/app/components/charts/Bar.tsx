"use client";

import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";
import "@/lib/register";

function getTrendColors(values: number[]) {
  return values.map((value, i) => (i === 0 || value >= values[i - 1] ? "#25d488" : "#f26161"));
}

const values = [4.5, 7.8, 6.2, 11.5, 7, 8.8];

const defaultData: ChartData<"bar", number[], string> = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
  datasets: [
    {
      data: values,
      backgroundColor: getTrendColors(values),
      borderRadius: 4,
      borderSkipped: false,
      barPercentage: 0.7,
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
    },
  },
};

export default function SalesChart() {
  return (
    <div className="w-full max-w-4xl p-4 md:p-8 border border-gray-200 rounded-2xl font-sans text-gray-800">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start mb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-gray-800">Income Progress</h2>
          <p className="text-sm text-gray-500">Track your income trajectory.</p>
        </div>

        <div className="flex flex-col items-start gap-2">
          <label className="text-xs font-medium text-gray-600">Selecionar período</label>
          <select className="w-full sm:w-auto border border-gray-300 rounded-md px-6 py-1.5 text-sm outline-none cursor-pointer hover:bg-gray-100 transition-colors">
            <option>Annual</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full h-[250px] md:h-[300px] flex-1">
          <Bar data={defaultData} options={defaultOptions} />
        </div>

        <div className="flex flex-row flex-wrap md:flex-col gap-4 md:mt-12 justify-start items-center md:items-start min-w-[120px]">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#25d488] rounded-[4px]" />
            <span className="text-sm font-medium">Increase</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 bg-[#f26161] rounded-[4px]" />
            <span className="text-sm font-medium">Decrease</span>
          </div>

          <div className="md:mt-4 ml-auto md:ml-0">
            <p className="text-xs text-gray-700">Currency: £ (GBP)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
