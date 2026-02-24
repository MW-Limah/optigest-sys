/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Aside from "@/components/Aside";
import DoughnutChart from "./components/charts/Doughnut";

export default function Home() {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:3001/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores: ", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
    fetchProducts();
  }, []);

  return (
    <div className="flex w-full h-screen bg-gray-100 ">
      <Aside />

      <main
        className="
          flex-1
          pt-[80px] md:pt-0
          px-4 md:px-10
          mt-5
          py-6
          overflow-y-auto
        "
      >
        <h1 className="text-2xl md:text-3xl mb-1 font-bold">Bem-vindo ao OptiGest</h1>
        <p className="text-lg md:text-xl text-gray-600">Sistema de Gestão de Estoque</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cards principais */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <div
              className="
                py-6 md:py-8 px-5 md:px-6
                bg-white shadow-lg rounded-xl
                hover:scale-[1.02]
                transition-transform duration-300 ease-in-out
                border-2 border-gray-200
              "
            >
              <p className="text-gray-600 text-sm md:text-md font-medium">Total de produtos</p>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 text-gray-900">{products.length}</h2>
            </div>

            <div
              className="
                py-6 md:py-8 px-5 md:px-6
                bg-white shadow-lg rounded-xl
                hover:scale-[1.02]
                transition-transform duration-300 ease-in-out
                border-2 border-gray-200
              "
            >
              <p className="text-gray-600 text-sm md:text-md font-medium">Total de fornecedores</p>
              <h2 className="text-2xl md:text-3xl font-bold mt-3 text-gray-900">{suppliers.length}</h2>
            </div>
          </div>

          {/* Chart */}
          <div className="col-span-1">
            <div
              className="
                py-6 md:py-8 px-5 md:px-6
                bg-white shadow-lg rounded-xl
                hover:scale-[1.02]
                transition-transform duration-300 ease-in-out
                border-2 border-gray-200
                h-full
              "
            >
              <p className="text-gray-600 text-sm md:text-md font-medium">Produtos Associados / Não Associados</p>

              <div className="mt-4 md:mt-6">
                <DoughnutChart />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
