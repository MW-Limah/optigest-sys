"use client";

import { Doughnut } from "react-chartjs-2";
import { ChartOptions, ChartData } from "chart.js";
import { useState, useEffect } from "react";

import "@/lib/register";

type Product = {
  id: number;
  name: string;
  suppliers: { id: number; name: string }[];
};

const defaultOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#2d2d2d",
      },
    },
  },
};

export default function DoughnutChart({ options = defaultOptions }) {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products-with-suppliers");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const associatedCount = products.filter((p) => p.suppliers.length > 0).length;

  const notAssociatedCount = products.filter((p) => p.suppliers.length === 0).length;

  const chartData: ChartData<"doughnut", number[], string> = {
    labels: ["Produtos Associados", "Sem Associação"],
    datasets: [
      {
        label: "Produtos",
        data: [associatedCount, notAssociatedCount],
        borderWidth: 4,
        backgroundColor: ["#22c55e", "#fad015"],
      },
    ],
  };

  return <Doughnut data={chartData} options={options} />;
}
